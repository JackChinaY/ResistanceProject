package com.rp.utility;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.math.BigDecimal;
import java.math.MathContext;
import java.math.RoundingMode;
import java.util.Enumeration;
import java.util.TooManyListenersException;

import gnu.io.CommPortIdentifier;
import gnu.io.PortInUseException;
import gnu.io.SerialPort;
import gnu.io.SerialPortEvent;
import gnu.io.SerialPortEventListener;
import gnu.io.UnsupportedCommOperationException;
import org.json.JSONArray;
import org.json.JSONObject;

public class ReadSerialPort implements SerialPortEventListener {// Runnable,

    private String appName = "端口传感器：";
    private int timeout = 2000;// open 端口时的等待时间
    private int threadTime = 0;

    private CommPortIdentifier commPort;// 端口名
    private SerialPort serialPort;// 串口
    private InputStream inputStream;
    private OutputStream outputStream;

    /**
     * @方法名称 :listPort
     * @功能描述 :列出所有可用的串口
     * @返回值类型 :void
     */
    @SuppressWarnings("rawtypes")
    public String listPort() {
        Enumeration en = CommPortIdentifier.getPortIdentifiers();
        // System.out.println("本地所有端口如下：" + en);
        JSONArray jsonArray = new JSONArray();// json数组
        while (en.hasMoreElements()) {
            CommPortIdentifier cpid = (CommPortIdentifier) en.nextElement();
            if (cpid.getPortType() == CommPortIdentifier.PORT_SERIAL) {

                // 先判断端口是否被占用
                try {
                    this.commPort = cpid;
                    serialPort = (SerialPort) commPort.open(appName, timeout);
                    serialPort.close();
                    serialPort = null;

                } catch (PortInUseException e) {
//					System.out.println(String.format("端口'%1$s'正在使用中！",
//							commPort.getName()));
                    continue;
                }
                commPort = null;
                JSONObject jo = new JSONObject();// 单个json对象
                // 如果端口未被占用就添加到json数组
                jo.put("port", cpid.getName());
                jsonArray.put(jo);// 将单个json对象添加进json数组

                 System.out.println("端口名：" + cpid.getName());
            }
        }
         System.out.println(jsonArray.toString());
        return jsonArray.toString();
    }

    /**
     * 构造方法
     */
    public ReadSerialPort() {
    }

    /**
     * @param portName
     * @方法名称 :selectPort
     * @功能描述 :选择一个端口，比如：COM1
     * @返回值类型 :void
     */
    @SuppressWarnings("rawtypes")
    public void selectPort(String portName) {
        this.commPort = null;
        CommPortIdentifier cpid;
        Enumeration en = CommPortIdentifier.getPortIdentifiers();

        while (en.hasMoreElements()) {
            cpid = (CommPortIdentifier) en.nextElement();
            if (cpid.getPortType() == CommPortIdentifier.PORT_SERIAL
                    && cpid.getName().equals(portName)) {
                try {
                    this.commPort = cpid;
                } catch (Exception e) {
                    System.out.println("端口初始化出错，可能被占用！");
                    throw new RuntimeException(e.getMessage());
                }

                break;
            }
        }
        openPort();
    }

    /**
     * @方法名称 :openPort打开指定端口
     * @功能描述 :打开SerialPort
     * @返回值类型 :void
     */
    private void openPort() {
        if (commPort == null)
            log(String.format("无法找到名字为'%1$s'的串口！", commPort.getName()));
        else {
            // log("端口选择成功，当前端口：" + commPort.getName() + ",现在实例化 SerialPort:");
            try {
                serialPort = (SerialPort) commPort.open(appName, timeout);
                try {
                    serialPort.setSerialPortParams(19200,
                            SerialPort.DATABITS_8, SerialPort.STOPBITS_1,
                            SerialPort.PARITY_NONE);// 设置串口参数依次为(波特率,数据位,停止位,奇偶检验)
                } catch (UnsupportedCommOperationException e) {
                    e.printStackTrace();
                }
//				log(String.format("端口'%1$s'打开成功！", commPort.getName()));
                comPortFlag = true;
            } catch (PortInUseException e) {
                System.out.println(String.format("端口'%1$s'正在使用中！",
                        commPort.getName()));
            }
        }
    }

    /**
     * @方法名称 :checkPort
     * @功能描述 :检查端口是否正确连接
     * @返回值类型 :void
     */
    private void checkPort() {
        if (commPort == null)
            throw new RuntimeException("没有选择端口，请使用 "
                    + "selectPort(String portName) 方法选择端口");

        if (serialPort == null) {
            throw new RuntimeException("SerialPort 对象无效！");
        }
    }

    /**
     * @param message
     * @方法名称 :write
     * @功能描述 :向端口发送数据，在调用此方法前先选择端口，并确定SerialPort正常打开！
     * @返回值类型 :void
     */
    public void write(byte[] message) {// String message
        checkPort();
        try {
            outputStream = new BufferedOutputStream(
                    serialPort.getOutputStream());
        } catch (IOException e) {
            throw new RuntimeException("获取端口的OutputStream出错：" + e.getMessage());
        }

        try {
            outputStream.write(message);// message.getBytes("gbk")
            // System.out.println("上位机成功发送一次单个字符：" + message);
            // try {
            // Thread.sleep(200);
            // } catch (InterruptedException e) {
            // e.printStackTrace();
            // }
            // outputStream.write(message.getBytes());//message.getBytes("gbk")

        } catch (IOException e) {
            throw new RuntimeException("向端口发送信息时出错：" + e.getMessage());
        } finally {
            try {
                outputStream.close();
            } catch (Exception e) {
            }
        }
    }

    /**
     * @方法名称 :startRead
     * @功能描述 :开始监听从端口中接收的数据
     * 监听程序的存活时间，单位为秒，0 则是一直监听
     */
    public void startRead() {
        checkPort();

        try {
            inputStream = new BufferedInputStream(serialPort.getInputStream());
        } catch (IOException e) {
            throw new RuntimeException("获取端口的InputStream出错：" + e.getMessage());
        }

        try {
            serialPort.addEventListener(this);// 添加事件监听者
        } catch (TooManyListenersException e) {
            throw new RuntimeException(e.getMessage());
        }

        serialPort.notifyOnDataAvailable(true);// 设置串口有数据的事件
        // log(String.format("开始监听来自'%1$s'的数据--------------",
        // commPort.getName()));

        // 设置线程
        // if (time > 0) {
        // this.threadTime = time;
        // Thread t = new Thread(this);// this代表接口Runnable的实现ReadSerialPort
        // t.start();
        // log(String.format("监听程序将在%1$d毫秒后关闭。。。。", threadTime));
        // }
    }

    // public void startRead(){
    // checkPort();
    //
    // try{
    // inputStream = new BufferedInputStream(serialPort.getInputStream());
    // }catch(IOException e){
    // throw new RuntimeException("获取端口的InputStream出错："+e.getMessage());
    // }
    //
    // try{
    // serialPort.addEventListener(this);
    // }catch(TooManyListenersException e){
    // throw new RuntimeException(e.getMessage());
    // }
    //
    // serialPort.notifyOnDataAvailable(true);
    //
    // log(String.format("开始监听来自'%1$s'的数据--------------", commPort.getName()));
    //
    // }

    public void log(String msg) {
        System.out.println(appName + " --> " + msg);
    }

    private byte[] tempAll = new byte[10240];// 每当端口有数据时就加入到此数组中
    private volatile int i = 0;// 负责tempAll数组的移位工作
    private volatile int p = 0;// 工作指针

    // 电阻1的数组有关变量
    private float[] arr1 = new float[5];// 电阻1的数组
    private volatile int m1 = 0;// 负责数组arr的移位工作
    private float average1 = 0;// 电阻1的平均数
    private float max1 = 0;// 电阻1的max
    private float min1 = 0;// 电阻1的min

    // 电阻2的数组有关变量
    private float[] arr2 = new float[5];// 电阻2的数组
    private volatile int m2 = 0;// 负责数组arr的移位工作
    private float average2 = 0f;// 电阻2的平均数
    private float max2 = 0;// 电阻2的max
    private float min2 = 0;// 电阻2的min

    // 电压&电流的数组有关变量
    private float[] arr3 = new float[5];// 电压&电流的数组
    private volatile int m3 = 0;// 负责数组arr3的移位工作
    private float average3 = 0f;// 电压&电流的平均数

    // 菜单值,单位值,有效位
    int menuValue = 0, unitValue = 0, valueNumber = 2;
    // 端口打开成功的标志
    boolean comPortFlag = false;
    // 密码握手成功的标志
    boolean passwordFlag = false;
    // 端口关闭成功的标志
    boolean closeComPortFlag = false;

    // 第一步 上位机发送：fe 68 11 00 00 0b b9 d5 16
    byte[] swjOutPut1 = {-2, 104, 17, 0, 0, 11, -71, -43, 22};
    // 第二步 下位机发送：FE 68 20 00 00 0b b9 e4 16 (发送密码)
    byte[] xwjInPut = {-2, 104, 32, 0, 0, 11, -71, -28, 22};
    // 第三步 上位机发送: fe 68 22 00 00 0b ba e7 16 (密码比对成功)
    byte[] swjOutPut2 = {-2, 104, 34, 0, 0, 11, -70, -25, 22};
    byte[] dataType1 = {32};// 当上传的数据类型为命令时0x20
    byte[] dataType2 = {16};// 当上传的数据类型为数据时0x10
    byte[] dataLastWei = {22};// 尾帧0x16
    byte[] menu = {0x00, 0x01, 0x02, 0x03};// 菜单00-AA,01-BB,02-CC,03-DD
    byte[] unit = {0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06};// 单位0x00-GΩ,0x01-MΩ,0x02-kΩ,0x03-Ω,0x04-mΩ,0x05-V,0x06-mA
    byte[] valueNumberArray = {0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
            0x08, 0x09, 0x10, 0x11, 0x12};// 有效位

    /**
     * 自动运行 数据接收的监听处理函数
     */
    public void serialEvent(SerialPortEvent arg0) {
        switch (arg0.getEventType()) {
            case SerialPortEvent.DATA_AVAILABLE:// Data available at the serial
                // port，端口有可用数据。读到缓冲数组，输出到终端
            {
                byte[] readBuffer = new byte[1024];// 申请一个字符空间，用于端口接收的数据
                int numBytes = 0;// 端口数据长度

                try {
                    while (inputStream.available() > 0) {// 该方法返回可估算从这个输入流中可无阻塞读取剩余的字节数
                        numBytes = inputStream.read(readBuffer);// 该方法将返回读入缓冲区的总字节数，或如果没有更多的数据被读取则返回-1,将16进制转换为10进制
                    }

                    // for (int i = 0; i < numBytes; i++) {
                    // System.out.print(readBuffer[i]+"  ");
                    // }

                    // //当缓存区存满时,清零
                    if (i + numBytes >= 10200 || i < p || i - p > 8000) {
                        i = 0;// 计数从头开始
                        p = 0;
                        break;
                    }
                    // System.out.println("本次接收到数据长度：" + numBytes);
                    // 赋值
                    for (int w = 0; w < numBytes; w++) {
                        tempAll[i] = readBuffer[w];
                        i++;
                        // System.out.print("  " + readBuffer[w]);
                    }

                    // 对接收下来的数据段进行处理
                    if (i - p >= 9) {
                        // // 判断前三位是FE 68 20 命令
                        if (tempAll[p] == xwjInPut[0]
                                && tempAll[p + 1] == xwjInPut[1]
                                && tempAll[p + 2] == xwjInPut[2]) {
                            // 前三位是FE 68 20 命令时，再判断后6位
                            if (tempAll[p + 3] == xwjInPut[3]
                                    && tempAll[p + 4] == xwjInPut[4]
                                    && tempAll[p + 5] == xwjInPut[5]
                                    && tempAll[p + 6] == xwjInPut[6]
                                    && tempAll[p + 7] == xwjInPut[7]
                                    && tempAll[p + 8] == xwjInPut[8]) {
                                // 发送密码比对成功
                                write(swjOutPut2);
                                passwordFlag = true;
//							 System.out.print("上位机发送了密码比对成功信息：");
//							 for (int w = 0; w < 9; w++) {
//							 System.out.print(swjOutPut2[w] + " ");
//							 }
                                p = p + 9;
                            }
                        }

                        // 判断前三位是 数据型 FE 68 10 00 42 3A 35 C7 01 44 ff 20 ab 05 42
                        // 3A 35 C7 00 16 2041.0209
                        else {
                            while (i - p >= 20) {
                                if (tempAll[p] == xwjInPut[0]
                                        && tempAll[p + 1] == xwjInPut[1]
                                        && tempAll[p + 2] == dataType2[0]
                                        && tempAll[p + 19] == dataLastWei[0]) {

                                    // 电阻1
                                    byte[] temp1 = new byte[4];
                                    for (int w = 0; w < 4; w++) {
                                        temp1[w] = tempAll[p + 4 + w];
                                    }

                                    // 电阻2
                                    byte[] temp2 = new byte[4];
                                    for (int w = 0; w < 4; w++) {
                                        temp2[w] = tempAll[p + 9 + w];
                                    }

                                    // 电压或电流
                                    byte[] temp3 = new byte[4];
                                    for (int w = 0; w < 4; w++) {
                                        temp3[w] = tempAll[p + 14 + w];
                                    }

                                    float a = getFloat(temp1, 0);// 电阻1
                                    float b = getFloat(temp2, 0);// 电阻2
                                    float c = getFloat(temp3, 0);// 电压或电流

                                    // System.out.println("电阻1：" + a + "\t电阻2：" + b
                                    // + "\t电压或电流：" + c);

                                    // 获得有效位0x00,0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x10,0x11,0x12
                                    setValueNumber();
//								System.out.println("有效位是：" + valueNumber);

                                    // 将数据存放到数组中，电阻1的
                                    if (m1 >= 5) {
                                        m1 = 0;
                                    } else if (m1 >= 0 && m1 <= 4) {
                                        arr1[m1] = a;
                                        m1++;
                                    }
                                    average1 = significand(average(arr1), valueNumber);// 保留有效位
                                    max1 = arrayMax(arr1);
                                    min1 = arrayMin(arr1);
                                    // System.out.println("电阻1的最近10个值："
                                    // + Arrays.toString(arr1));
                                    // System.out.println("电阻1的平均数：" + average1);

                                    // 将数据存放到数组中，电阻2的
                                    if (m2 >= 5) {
                                        m2 = 0;
                                    } else if (m2 >= 0 && m2 <= 4) {
                                        arr2[m2] = b;
                                        m2++;
                                    }
                                    average2 = significand(average(arr2), valueNumber);
                                    max2 = arrayMax(arr2);
                                    min2 = arrayMin(arr2);
                                    // System.out.println("电阻2的最近10个值："
                                    // + Arrays.toString(arr2));
                                    // System.out.println("电阻2的平均数：" + average2);

                                    // 将数据存放到数组中，电压或电流
                                    if (m3 >= 5) {
                                        m3 = 0;
                                    } else if (m3 >= 0 && m3 <= 4) {
                                        arr3[m3] = c;
                                        m3++;
                                    }
                                    average3 = significand(average(arr3), valueNumber);// 保留有效位
                                    // System.out.println("电压或电流的最近10个值："
                                    // + Arrays.toString(arr3));
//								System.out.print("电阻1的平均数：" + average1
//										+ " 电阻2的平均数：" + average2
//										+ " 电压或电流的平均数：" + average3);

                                    // 处理菜单值,菜单00-AA,01-BB,02-CC,03-DD
                                    if (tempAll[p + 3] == menu[0]) {
                                        menuValue = 0;
                                    } else if (tempAll[p + 3] == menu[1]) {
                                        menuValue = 1;
                                    } else if (tempAll[p + 3] == menu[2]) {
                                        menuValue = 2;
                                    } else if (tempAll[p + 3] == menu[3]) {
                                        menuValue = 3;
                                    }
                                    // 处理单位值,单位0x00-GΩ,0x01-MΩ,0x02-kΩ,0x03-Ω,0x04-mΩ,0x05-V,0x06-mA
                                    if (tempAll[p + 8] == unit[0]) {
                                        unitValue = 0;
                                    } else if (tempAll[p + 8] == unit[1]) {
                                        unitValue = 1;
                                    } else if (tempAll[p + 8] == unit[2]) {
                                        unitValue = 2;
                                    } else if (tempAll[p + 8] == unit[3]) {
                                        unitValue = 3;
                                    } else if (tempAll[p + 8] == unit[4]) {
                                        unitValue = 4;
                                    } else if (tempAll[p + 8] == unit[5]) {
                                        unitValue = 5;
                                    } else if (tempAll[p + 8] == unit[6]) {
                                        unitValue = 6;
                                    }

                                    p = p + 20;
//								System.out.println("\t上位机的i:" + i + "上位机的p:"
//										+ p);
                                } else {
                                    p++;
                                }
                            }
                        }
                    }
                    // System.out.println("\n上位机的i:" + i + "上位机的p:" + p);

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
            case SerialPortEvent.BI:// Break interrupt,通讯中断
            {
                // System.out.println("Break interrupt,通讯中断");
                break;
            }
            case SerialPortEvent.OE:// Overrun error，溢位错误
            {
                System.out.println("Overrun error，溢位错误");
                break;
            }
            case SerialPortEvent.FE:// Framing error，传帧错误
            {
                System.out.println("Framing error，传帧错误");
                break;
            }
            case SerialPortEvent.PE:// Parity error，校验错误
            {
                System.out.println("Parity error，校验错误");
                break;
            }
            case SerialPortEvent.CD:// Carrier detect，载波检测
            {
                System.out.println("Carrier detect，载波检测");
                break;
            }
            case SerialPortEvent.CTS:// Clear to send，清除发送
            {
                System.out.println("Clear to send，清除发送");
                break;
            }
            case SerialPortEvent.DSR:// Data set ready，数据设备就绪
            {
                System.out.println("Data set ready，数据设备就绪");
                break;
            }
            case SerialPortEvent.RI:// Ring indicator，响铃指示
            {
                System.out.println("Ring indicator，响铃指示");
                break;
            }
            case SerialPortEvent.OUTPUT_BUFFER_EMPTY:// Output buffer is
                // empty，输出缓冲区清空
            {
                System.out.println("Output buffer is empty，输出缓冲区清空");
                break;
            }
            default:
                break;
        }
    }

    /**
     * @方法名称 :close
     * @功能描述 :关闭 SerialPort
     * @返回值类型 :void
     */
    public void close() {
        if (serialPort != null) {
            serialPort.notifyOnDataAvailable(false);// 设置串口无数据的事件
            serialPort.removeEventListener();// 移除SerialPort对象中的串口事件监听器
            serialPort.close();
            serialPort = null;
//			log(String.format("端口'%1$s'关闭成功！", commPort.getName()));
            commPort = null;
            closeComPortFlag = true;
        }
    }

//	/**
//	 * thread线程开始后运行的函数
//	 */
    // public void run() {
    // try {
    // Thread.sleep(threadTime);
    // serialPort.notifyOnDataAvailable(false);
    // serialPort.removeEventListener();
    // serialPort.close();
    // serialPort = null;
    // log(String.format("端口'%1$s'监听关闭了！", commPort.getName()));
    // commPort = null;
    // } catch (Exception e) {
    // e.printStackTrace();
    // }
    // }

    // 获得电阻1的平均值
    public float getAverage1() {
        return average1;
    }

    // 获得电阻1的Max
    public float getMax1() {
        return max1;
    }

    // 获得电阻1的Min
    public float getMin1() {
        return min1;
    }

    // 获得电阻2的平均值
    public float getAverage2() {
        return average2;
    }

    // 获得电阻2的Max
    public float getMax2() {
        return max2;
    }

    // 获得电阻2的Min
    public float getMin2() {
        return min2;
    }

    // 获得电压&电流的平均值
    public float getAverage3() {
        return average3;
    }

    // 菜单值
    public int getMenuValue() {
        return menuValue;
    }

    // 单位值
    public int getUnitValue() {
        return unitValue;
    }

    // 有效位
    public int getValueNumber() {
        return valueNumber;
    }

    // 端口打开成功的标志
    public boolean isComPortFlag() {
        return comPortFlag;
    }

    public void setValueNumber(int valueNumber) {
        this.valueNumber = valueNumber;
    }

    public void setComPortFlag(boolean comPortFlag) {
        this.comPortFlag = comPortFlag;
    }

    // 密码握手成功的标志
    public boolean isPasswordFlag() {
        return passwordFlag;
    }

    public void setPasswordFlag(boolean passwordFlag) {
        this.passwordFlag = passwordFlag;
    }

    // 端口关闭成功的标志
    public boolean isCloseComPortFlag() {
        return closeComPortFlag;
    }

    public void setCloseComPortFlag(boolean closeComPortFlag) {
        this.closeComPortFlag = closeComPortFlag;
    }

    /**
     * 求取平均数
     */
    public float average(float[] array) {
        float temp = 0;
        float sum = 0;
        for (int i = 0; i < array.length; i++) {
            sum = sum + array[i];
        }
        temp = sum / array.length;
        return temp;
    }

    /**
     * 通过byte数组取得float ,byte数组为4字节 66 e6 f0 42=120.45
     *
     * @param b
     * @param index 第几位开始取
     * @return
     */
    public float getFloat(byte[] b, int index) {
        int l;
        l = b[index + 0];
        l &= 0xff;
        l |= ((long) b[index + 1] << 8);
        l &= 0xffff;
        l |= ((long) b[index + 2] << 16);
        l &= 0xffffff;
        l |= ((long) b[index + 3] << 24);
        return Float.intBitsToFloat(l);
    }

    /**
     * 求数组最大值
     */
    public float arrayMax(float[] array) {
        float maxValue = array[0];
        for (int i = 0; i < array.length; i++) {
            if (array[i] > maxValue)
                maxValue = array[i];
        }
        return maxValue;
    }

    /**
     * 求数组最小值
     */
    public float arrayMin(float[] array) {
        float minValue = array[0];
        for (int i = 0; i < array.length; i++) {
            if (array[i] < minValue)
                minValue = array[i];
        }
        return minValue;
    }

    /**
     * 求取有效位
     * 处理有效位0x00,0x01,0x02,0x03,0x04,0x05,0x06,0x07,0x08,0x09,0x10,0x11,0x12
     */
    public void setValueNumber() {
        if (tempAll[p + 13] == valueNumberArray[0]) {
            valueNumber = 0;
        } else if (tempAll[p + 13] == valueNumberArray[1]) {
            valueNumber = 1;
        } else if (tempAll[p + 13] == valueNumberArray[2]) {
            valueNumber = 2;
        } else if (tempAll[p + 13] == valueNumberArray[3]) {
            valueNumber = 3;
        } else if (tempAll[p + 13] == valueNumberArray[4]) {
            valueNumber = 4;
        } else if (tempAll[p + 13] == valueNumberArray[5]) {
            valueNumber = 5;
        } else if (tempAll[p + 13] == valueNumberArray[6]) {
            valueNumber = 6;
        } else if (tempAll[p + 13] == valueNumberArray[7]) {
            valueNumber = 7;
        } else if (tempAll[p + 13] == valueNumberArray[8]) {
            valueNumber = 8;
        } else if (tempAll[p + 13] == valueNumberArray[9]) {
            valueNumber = 9;
        } else if (tempAll[p + 13] == valueNumberArray[10]) {
            valueNumber = 10;
        } else if (tempAll[p + 13] == valueNumberArray[11]) {
            valueNumber = 11;
        } else if (tempAll[p + 13] == valueNumberArray[12]) {
            valueNumber = 12;
        }
    }

    /**
     * 保留几位有效数字
     *
     * @param oldFloat 待操作数
     * @param scale    精度
     * @return
     */
    public float significand(float oldFloat, int scale) {
        if (scale < 0) {
            throw new IllegalArgumentException("scale指定的精度为非负值");
        }
        /**
         * RoundingMode：舍入模式 UP：远离零方向舍入的舍入模式； DOWN：向零方向舍入的舍入模式； CEILING：
         * 向正无限大方向舍入的舍入模式； FLOOR：向负无限大方向舍入的舍入模式；
         * HALF_DOWN：向最接近数字方向舍入的舍入模式，如果与两个相邻数字的距离相等，则向下舍入；
         * HALF_UP：向最接近数字方向舍入的舍入模式，如果与两个相邻数字的距离相等，则向上舍入；
         * HALF_EVEN：向最接近数字方向舍入的舍入模式
         * ，如果与两个相邻数字的距离相等，则向相邻的偶数舍入;(在重复进行一系列计算时,此舍入模式可以将累加错误减到最小)
         * UNNECESSARY：用于断言请求的操作具有精确结果的舍入模式，因此不需要舍入。
         */
        RoundingMode rMode = null;
        if (oldFloat > 0) {
            rMode = RoundingMode.HALF_UP;
        } else {
            rMode = RoundingMode.HALF_UP;
        }
        // 此处的scale表示的是，几位有效位数
        BigDecimal b = new BigDecimal(String.valueOf(oldFloat),
                new MathContext(scale, rMode));
        return b.floatValue();
    }

    // public static void main(String[] args) {
    // }

}

package com.rp.action;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.rp.model.AssistantData;
import com.rp.model.InspectionDecLeft;
import com.rp.model.InspectionDevice;
import com.rp.model.StandardDevice;
import com.rp.model.User;
import com.rp.model.CaiYangRNRX;
import com.rp.model.PositionEffect;
import com.rp.service.RpService;
import com.rp.utility.CopyFile;
import com.rp.utility.ReadSerialPort;
import com.rp.utility.WordCreation;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * @author Administrator
 */
public class RpAction extends BaseAction {

	/**
	 * 序列化
	 */
	private static final long serialVersionUID = 2031023310875335897L;
	private RpService rpService = new RpService();
	private static final ReadSerialPort readSerialPort = new ReadSerialPort();

	/**
	 * 方法序号：1 登录
	 * 
	 * @throws IOException
	 */
	public String login() throws IOException {
		String username = this.getRequest().getParameter("username");
		String password = this.getRequest().getParameter("password");
		String result = rpService.login(username, password);
		String flag;
		if (result != null) {
			flag = "登录成功";
		} else {
			flag = "登录失败";
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		jo.put("username", username);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
		return null;
	}

	/**
	 * 方法序号：2 注册
	 * 
	 * @throws IOException
	 */
	public String register() throws IOException {
		String username = this.getRequest().getParameter("username");
		String password = this.getRequest().getParameter("password");
		User user = new User();
		user.setUsername(username);
		user.setPassword(password);
		boolean result = rpService.register(user);
		String flag;
		if (result) {
			flag = "注册成功！";
		} else {
			flag = "注册失败！";
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
		return null;
	}

	/**
	 * 方法序号：3 送检仪器信息录入
	 * 
	 * @throws IOException
	 */
	public String addInspectionDevice() throws IOException {
		InspectionDevice inspectionDevice = new InspectionDevice();
		inspectionDevice.setLeixing(this.getRequest().getParameter("leixing"));
		inspectionDevice.setXinghao(this.getRequest().getParameter("xinghao"));
		inspectionDevice.setYqmc(this.getRequest().getParameter("yqmc"));
		inspectionDevice.setYqbh(this.getRequest().getParameter("yqbh"));
		inspectionDevice.setSjdw(this.getRequest().getParameter("sjdw"));
		inspectionDevice.setZqddj(this.getRequest().getParameter("zqddj"));
		inspectionDevice.setClfw(this.getRequest().getParameter("clfw"));
		inspectionDevice.setSccj(this.getRequest().getParameter("sccj"));
		inspectionDevice.setJddd(this.getRequest().getParameter("jddd"));
		inspectionDevice.setWendu(this.getRequest().getParameter("wendu"));
		inspectionDevice.setShidu(this.getRequest().getParameter("shidu"));
		inspectionDevice.setJdsj(this.getRequest().getParameter("jdsj"));
		inspectionDevice.setYxqsj(this.getRequest().getParameter("yxqsj"));
		inspectionDevice.setJdyj(this.getRequest().getParameter("jdyj"));
		inspectionDevice.setZsbh(this.getRequest().getParameter("zsbh"));
		if(inspectionDevice.getLeixing().equals("绝缘电阻表")){
		inspectionDevice.setStaDevLX("绝缘电阻表标准器");
		}else {
			inspectionDevice.setStaDevLX("接地电阻表标准器");
		}
		// System.out.println(inspectionDevice.toString());
		boolean result = rpService.addInspectionDevice(inspectionDevice);

		String flag;
		if (result) {
			flag = "录入成功！";
		} else {
			flag = "录入失败！";
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
		return null;
	}

	/**
	 * 方法序号：3_1验证证书编号是否存在
	 */
	public void verifyInspectionDeviceZSBH() throws IOException {
		String id = this.getRequest().getParameter("zsbh");
		long result = rpService.verifyInspectionDeviceZSBH(id);// 打包json数据
		// System.out.println(result);
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", result);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}

	/**
	 * 方法序号：4 查询所有送检仪器信息
	 */
	public String findAllInspectionDevice() throws IOException {
		String result = rpService.findAllInspectionDevice();// 打包json数据
		JSONArray allJsonArray = new JSONArray(result);
		// System.out.println(result);
		JSONObject jo = new JSONObject();
		jo.put("allJsonArray", allJsonArray);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
		return null;
	}

	/**
	 * 方法序号：4_0 按某种特定顺序， 查询所有送检仪器信息
	 */
	public String findAllInspectionDeviceByOrder() throws IOException {
		String order = this.getRequest().getParameter("order");
		String result = rpService.findAllInspectionDeviceByOrder(order);// 打包json数据
		JSONArray allJsonArray = new JSONArray(result);
		JSONObject jo = new JSONObject();
		jo.put("allJsonArray", allJsonArray);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
		return null;
	}

	/**
	 * 方法序号：4_1 根据证书编号， 查询单条送检仪器信息
	 */
	public String findOneInspectionDevice() throws IOException {
		String id = this.getRequest().getParameter("id");// 证书编号
		String result = rpService.findOneInspectionDevice(id);// 打包json数据
		JSONArray allJsonArray =new JSONArray(result);
		JSONObject jo = new JSONObject();
		jo.put("allJsonArray", allJsonArray);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
		return null;
	}

	/**
	 * 方法序号： 4_2 删除一条送检仪器信息
	 * 
	 * @throws IOException
	 */
	public String deleteInspectionDevice() throws IOException {
		String title = this.getRequest().getParameter("title");// 证书编号
		boolean result = rpService.deleteInspectionDevice(title);
		String flag;
		if (result) {
			flag = "1";// 删除成功！
		} else {
			flag = "0";// 删除失败！
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
		return null;
	}

	/**
	 * 方法序号：4_3 修改一条送检仪器信息
	 * 
	 * @throws IOException
	 */
	public String modifyInspectionDevice() throws IOException {
		InspectionDevice inspectionDevice = new InspectionDevice();

		inspectionDevice.setLeixing(this.getRequest().getParameter("leixing"));
		inspectionDevice.setXinghao(this.getRequest().getParameter("xinghao"));
		inspectionDevice.setYqmc(this.getRequest().getParameter("yqmc"));
		inspectionDevice.setYqbh(this.getRequest().getParameter("yqbh"));
		inspectionDevice.setSjdw(this.getRequest().getParameter("sjdw"));
		inspectionDevice.setZqddj(this.getRequest().getParameter("zqddj"));
		inspectionDevice.setClfw(this.getRequest().getParameter("clfw"));
		inspectionDevice.setSccj(this.getRequest().getParameter("sccj"));
		inspectionDevice.setJddd(this.getRequest().getParameter("jddd"));
		inspectionDevice.setWendu(this.getRequest().getParameter("wendu"));
		inspectionDevice.setShidu(this.getRequest().getParameter("shidu"));
		inspectionDevice.setJdsj(this.getRequest().getParameter("jdsj"));
		inspectionDevice.setYxqsj(this.getRequest().getParameter("yxqsj"));
		inspectionDevice.setJdyj(this.getRequest().getParameter("jdyj"));
		inspectionDevice.setZsbh(this.getRequest().getParameter("zsbh"));
		
		boolean result = rpService.modifyInspectionDevice(inspectionDevice);

		String flag;
		if (result) {
			flag = "1";//修改成功！
		} else {
			flag = "0";//修改失败！
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
		return null;
	}

	/**
	 * 方法序号：5 标准器信息录入
	 * 
	 * @throws IOException
	 */
	public String addStandardDevice() throws IOException {
		StandardDevice standardDevice = new StandardDevice();
		standardDevice.setLx(this.getRequest().getParameter("leixing"));
		standardDevice.setXinghao(this.getRequest().getParameter("xinghao"));
		standardDevice.setMingchen(this.getRequest().getParameter("mingchen"));
		standardDevice.setYqbh(this.getRequest().getParameter("yqbh"));
		standardDevice.setBqdd(this.getRequest().getParameter("bqdd"));
		standardDevice.setJlbzzsh(this.getRequest().getParameter("jlbzzsh"));
		standardDevice.setYxqz(this.getRequest().getParameter("yxqz"));
		
		boolean result = rpService.addStandardDevice(standardDevice);
		String flag;
		if (result) {
			flag = "录入成功！";
		} else {
			flag = "录入失败！";
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
		return null;
	}

	/**
	 * 方法序号：6 查询所有标准器信息
	 */
	public String findAllStandardDevice() throws IOException {
		String result = rpService.findAllStandardDevice();// 打包json数据
		JSONArray allJsonArray = new JSONArray(result);
		JSONObject jo = new JSONObject();
		jo.put("allJsonArray", allJsonArray);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
		return null;
	}

	/**
	 * 方法序号： 标准器信息 单条修改
	 * 
	 * @throws IOException
	 */
	public String modifyStandardDevice() throws IOException {
		StandardDevice standardDevice = new StandardDevice();
		standardDevice.setXinghao(this.getRequest().getParameter("xinghao"));
		standardDevice.setMingchen(this.getRequest().getParameter("mingchen"));
		standardDevice.setYqbh(this.getRequest().getParameter("yqbh"));
		standardDevice.setBqdd(this.getRequest().getParameter("bqdd"));
		standardDevice.setJlbzzsh(this.getRequest().getParameter("jlbzzsh"));
		standardDevice.setYxqz(this.getRequest().getParameter("yxqz"));
		standardDevice.setLx(this.getRequest().getParameter("leixing"));
		boolean result = rpService.modifyStandardDevice(standardDevice);

		String flag;
		if (result) {
			flag = "1";//修改成功
		} else {
			flag = "0";//修改失败
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
		return null;
	}

	/**
	 * 方法序号： 删除标准器信息
	 * 
	 * @throws IOException
	 */
	public String deleteStandardDevice() throws IOException {
		String title = this.getRequest().getParameter("title");// 证书编号
		boolean result = rpService.deleteStandardDevice(title);
		String flag;
		if (result) {
			flag = "删除成功！";
		} else {
			flag = "删除失败！";
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
		return null;
	}

	/**
	 * 方法序号： 7_1 增加送检仪器和标准器（型号）之间的对应关系
	 */
//	public String addRelationship() throws IOException {
//		String zsbh = this.getRequest().getParameter("zsbh");
//		String xh = this.getRequest().getParameter("xh");
//		boolean result = rpService.addRelationship(zsbh, xh);
//		// 测试阶段先注释，正式时取消此七处注释
//		String flag;
//		if (result) {
//			flag = "1";// 添加成功
//		} else {
//			flag = "0";// 添加失败
//		}
//		JSONObject jo = new JSONObject();
//		jo.put("jsonObject", flag);
//		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
//		this.getResponse().getWriter().print(jo);// 向前台发送json数据
//		return null;
//	}

	/**
	 * 方法序号： 7_2 端口选择
	 */
	public void listPorts() throws IOException {
		String result = readSerialPort.listPort();
		JSONArray allJsonArray = new JSONArray(result);
		JSONObject jo = new JSONObject();
		jo.put("allJsonArray", allJsonArray);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}

	/**
	 * 方法序号： 7_3 打开指定端口
	 */
	public void openPort() throws IOException {
		String portName = this.getRequest().getParameter("port");
		// 第一步 上位机发送：fe 68 11 00 00 0b b9 d5 16
		// byte[] swjOutPut1 = { -2, 104, 17, 0, 0, 11, -71, -43, 22 };
		// 第二步 下位机发送：FE 68 20 00 00 0b b9 e4 16 (发送密码)
		// byte[] xwjInPut = { -2, 104, 32, 0, 0, 11, -71, -28, 22 };
		// 第三步 上位机发送: fe 68 22 00 00 0b ba e7 16 (密码比对成功)
		// byte[] swjOutPut2 = { -2, 104, 34, 0, 0, 11, -70, -25, 22 };
		readSerialPort.selectPort(portName);
		boolean result = readSerialPort.isComPortFlag();
		String flag;
		if (result) {
			flag = "1";
		} else {
			flag = "0";
		}
		readSerialPort.setComPortFlag(false);
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
		readSerialPort.startRead();// 单位毫秒 开始监听事件
	}

	/**
	 * 方法序号： 7_3_1 发送密码
	 */
	public void sendData() throws IOException {
		// 第一步 上位机发送：fe 68 11 00 00 0b b9 d5 16
		byte[] swjOutPut1 = { -2, 104, 17, 0, 0, 11, -71, -43, 22 };
		// 第二步 下位机发送：FE 68 20 00 00 0b b9 e4 16 (发送密码)
		// byte[] xwjInPut = { -2, 104, 32, 0, 0, 11, -71, -28, 22 };
		// 第三步 上位机发送: fe 68 22 00 00 0b ba e7 16 (密码比对成功)
		// byte[] swjOutPut2 = { -2, 104, 34, 0, 0, 11, -70, -25, 22 };
		readSerialPort.write(swjOutPut1);
//		System.out.println("开始");
		//当前线程挂起指定的毫秒数
		try {
			Thread.currentThread();
			Thread.sleep(1000);//毫秒 
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
//		System.out.println("延时1秒");
		boolean result = readSerialPort.isPasswordFlag();
		//判断连接是否成功
		if (result==false) {
			//如果不成功，将进行10次再连接，直到有一次成功为止
			for (int i = 0; i < 10; i++) {
				readSerialPort.write(swjOutPut1);
				try {
					Thread.currentThread();
					Thread.sleep(1000);
//					System.out.println(i);
				} catch (InterruptedException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}//毫秒 
				if (readSerialPort.isPasswordFlag()) {
					result = readSerialPort.isPasswordFlag();
					break;
				}
			}
		}
		String flag;
		if (result) {
			flag = "1";
		} else {
			flag = "0";
		}
		readSerialPort.setPasswordFlag(false);
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}

	/**
	 * 获取采样part1部分的数据
	 */
	public void getCaiyangDataPart1() throws IOException {
		int temp = 0;
		JSONObject jo = new JSONObject();
//		while (readSerialPort.getMax1() - readSerialPort.getMin1() >= 0.005
//				&& readSerialPort.getMax2() - readSerialPort.getMin2() >= 0.005
//				&& temp <= 10) {
//			try {
//				temp++;
////				System.out.println(temp);
//				Thread.sleep(1000);
//			} catch (InterruptedException e) {
//				e.printStackTrace();
//			}
//		}
		jo.put("average1", String.valueOf(readSerialPort.getAverage1()));// 电阻1
		jo.put("average2", String.valueOf(readSerialPort.getAverage2()));// 电阻2
		jo.put("average3", String.valueOf(readSerialPort.getAverage3()));// 电压或电流
		jo.put("menu", readSerialPort.getMenuValue());// 菜单
		jo.put("uint", readSerialPort.getUnitValue());// 单位
//		jo.put("valueNum", readSerialPort.getValueNumber());//有效位
//		 System.out.println(readSerialPort.getAverage3());
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}

	/**
	 * 方法序号： 7_3 关闭端口
	 * 
	 * @throws IOException
	 */
	public void closePort() throws IOException {
		readSerialPort.close();
		boolean result = readSerialPort.isCloseComPortFlag();
		String flag;
		if (result) {
			flag = "1";
		} else {
			flag = "0";
		}
		readSerialPort.setCloseComPortFlag(false);
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}

	/**
	 * 方法序号： 8_1 提交全检量程区段
	 */
	public void addQJData() throws IOException {
		String zsbh = this.getRequest().getParameter("zsbh");// //送检仪器证书编号
		String dw = this.getRequest().getParameter("dw");// 单位6/9/12--->M/G/T
		ArrayList<CaiYangRNRX> caiYangRNRXList = new ArrayList<CaiYangRNRX>();

		for (int i = 1; i <= 10; i++) {
			CaiYangRNRX caiYangRNRX = new CaiYangRNRX();
			caiYangRNRX.setStandardvalue(this.getRequest().getParameter(
					"bzz" + i));
			caiYangRNRX.setReadvalue(this.getRequest().getParameter("dsz" + i));
			if (caiYangRNRX.getStandardvalue() == ""
					|| caiYangRNRX.getReadvalue() == "")
				continue;
			caiYangRNRX.setZsbh(zsbh);
			caiYangRNRX.setDw(dw);
			caiYangRNRX.setId(i);
			caiYangRNRXList.add(caiYangRNRX);
			// System.out.println(caiYangRNRX.toString());
		}
		boolean result = rpService.addQJData(caiYangRNRXList);
		String flag;
		if (result) {
			flag = "1";
		} else {
			flag = "0";
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}

	/**
	 * 方法序号：8_2 提交非全检量程区段
	 */
	public void addFQJData() throws IOException {
		String zsbh = this.getRequest().getParameter("zsbh");// //送检仪器证书编号
		String dw1 = this.getRequest().getParameter("dw1");// 单位6/9/12--->M/G/T
		String dw2 = this.getRequest().getParameter("dw2");// 单位6/9/12--->M/G/T
		String dw3 = this.getRequest().getParameter("dw3");// 单位6/9/12--->M/G/T
		ArrayList<CaiYangRNRX> caiYangRNRXList = new ArrayList<CaiYangRNRX>();

		for (int i = 1; i <= 9; i++) {
			CaiYangRNRX caiYangRNRX = new CaiYangRNRX();
			caiYangRNRX.setStandardvalue(this.getRequest().getParameter(
					"bzz" + i));
			// 当该字段为空值时，在后台数据库中就插入"*---"字符串
			if (caiYangRNRX.getStandardvalue() == "") {
				caiYangRNRX.setStandardvalue("*---");
			}

			caiYangRNRX.setReadvalue(this.getRequest().getParameter("dsz" + i));
			if (caiYangRNRX.getReadvalue() == "") {
				caiYangRNRX.setReadvalue("*---");
			}
			caiYangRNRX.setZsbh(zsbh);
			if (i >= 1 && i <= 3) {
				caiYangRNRX.setDw(dw1);
			} else if (i >= 4 && i <= 6) {
				caiYangRNRX.setDw(dw2);
			} else if (i >= 7 && i <= 9) {
				caiYangRNRX.setDw(dw3);
			}
			caiYangRNRX.setId(i);
			caiYangRNRXList.add(caiYangRNRX);
//			System.out.println(caiYangRNRX.toString());
		}
		boolean result = rpService.addFQJData(caiYangRNRXList);
		String flag;
		if (result) {
			flag = "1";
		} else {
			flag = "0";
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}

	/**
	 * 方法序号：8_3 提交Part3 位置影响试验
	 */
	public void addPositionEffectData() throws IOException {
		String zsbh = this.getRequest().getParameter("zsbh");// 送检仪器证书编号
		ArrayList<PositionEffect> positionEffectList = new ArrayList<PositionEffect>();

		for (int i = 1; i <= 3; i++) {
			PositionEffect positionEffect = new PositionEffect();
			positionEffect.setZsbh(zsbh);
			positionEffect.setLc(this.getRequest().getParameter("lc" + i));
			positionEffect.setFront(this.getRequest().getParameter(
					"value" + i + "1"));
			positionEffect.setBack(this.getRequest().getParameter(
					"value" + i + "2"));
			positionEffect.setLeft(this.getRequest().getParameter(
					"value" + i + "3"));
			positionEffect.setRight(this.getRequest().getParameter(
					"value" + i + "4"));
			positionEffect.setDw(this.getRequest().getParameter("dw" + i));// 单位1/2/3--->m/欧/k
			if (positionEffect.getLc() == "")
				positionEffect.setLc("*---");
			if (positionEffect.getFront() == "")
				positionEffect.setFront("*---");
			if (positionEffect.getBack() == "")
				positionEffect.setBack("*---");
			if (positionEffect.getLeft() == "")
				positionEffect.setLeft("*---");
			if (positionEffect.getRight() == "")
				positionEffect.setRight("*---");
			positionEffect.setId(i);
			positionEffectList.add(positionEffect);
			// System.out.println(positionEffect.toString());
		}
		boolean result = rpService.addPositionEffectData(positionEffectList);
		String flag;
		if (result) {
			flag = "1";
		} else {
			flag = "0";
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}

	/**
	 * 方法序号：8_4 提交Part4 辅助接地电阻影响试验数据
	 */
	public void addAssistantData() throws IOException {
		String zsbh = this.getRequest().getParameter("zsbh");// //送检仪器证书编号
		ArrayList<AssistantData> assistantDataList = new ArrayList<AssistantData>();

		for (int i = 1; i <= 3; i++) {
			AssistantData assistantData = new AssistantData();
			assistantData.setZsbh(zsbh);
			assistantData.setLc(this.getRequest().getParameter("lc" + i));
			assistantData.setValue_0(this.getRequest().getParameter(
					"value" + i + "1"));
			assistantData.setValue_500(this.getRequest().getParameter(
					"value" + i + "2"));
			assistantData.setValue_1000(this.getRequest().getParameter(
					"value" + i + "3"));
			assistantData.setValue_2000(this.getRequest().getParameter(
					"value" + i + "4"));
			assistantData.setValue_5000(this.getRequest().getParameter(
					"value" + i + "5"));
			assistantData.setDw(this.getRequest().getParameter("dw" + i));// 单位1/2/3--->m/欧/k
			if (assistantData.getLc() == "" )
				assistantData.setLc("*---");
			if (assistantData.getValue_0() == "")
				assistantData.setValue_0("*---");
			if (assistantData.getValue_500() == "")
				assistantData.setValue_500("*---");
			if (assistantData.getValue_1000() == "")
				assistantData.setValue_1000("*---");
			if (assistantData.getValue_2000() == "")
				assistantData.setValue_2000("*---");
			if (assistantData.getValue_5000() == "")
				assistantData.setValue_5000("*---");
			assistantData.setId(i);
			assistantDataList.add(assistantData);
			// System.out.println(assistantData.toString());
		}
		boolean result = rpService.addAssistantData(assistantDataList);
		String flag;
		if (result) {
			flag = "1";
		} else {
			flag = "0";
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}
	
	/**
	 * 方法序号：8_5 提交 开路测量电压and跌落（中值）电压  BB
	 */
	public void addKLDL() throws IOException {
		String zsbh = this.getRequest().getParameter("zsbh");//送检仪器证书编号
		String kailu = this.getRequest().getParameter("kailu");//开路测量电压
		String dieluo = this.getRequest().getParameter("dieluo");//跌落（中值）电压
		
		// System.out.println();
		boolean result = rpService.addKLDL(zsbh,kailu,dieluo);
		String flag;
		if (result) {
			flag = "1";
		} else {
			flag = "0";
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}

	/**
	 * 方法序号：9_1 生成绝缘电阻表原始记录证书
	 */
	public void createJYOriginal() throws IOException {
		String zsbh = this.getRequest().getParameter("zsbh");// 送检仪器证书编号
		InspectionDecLeft ins = new InspectionDecLeft();
		ins.setZsbh(zsbh);
		ins.setWg(this.getRequest().getParameter("value1"));
		ins.setJydz(this.getRequest().getParameter("value2"));
		ins.setJyqd(this.getRequest().getParameter("value3"));
		ins.setXsnl(this.getRequest().getParameter("value4"));
		ins.setKlcldy(this.getRequest().getParameter("value5"));
		ins.setDldy(this.getRequest().getParameter("value6"));
		ins.setDndywdx(this.getRequest().getParameter("value7"));
		ins.setQxyyjy(this.getRequest().getParameter("value8"));
		
		String reaPath=this.getServletContext().getRealPath("");//得到当前应用在服务器的绝对路径
//		System.out.println(ins.toString());
		boolean result = rpService.addInspectionDecLeft(ins);// 添加绝缘电阻表剩余部分数据到数据库
		boolean p = false;
		if (result) {
			String inspectionDevice = rpService.findOneInspectionDevice(zsbh);// 送检仪器
			JSONArray jsonArray = new JSONArray(inspectionDevice);

			String standardDevLX = jsonArray.getJSONObject(0).getString(
					"staDevLX");// 送检仪器和标准器关系
			String standardDevice = rpService
					.findOneStandardDevice(standardDevLX);// 标准器
			String fullRangeData = rpService.findFullRangeDataById(zsbh);// 全检量程区段
			String notFullRangeData = rpService.findNotFullRangeDataById(zsbh);// 非全检量程区段

			JSONObject jsonObject = new JSONObject();
			jsonObject.put("inspectionDevice", inspectionDevice);// 送检仪器
			jsonObject.put("standardDevice", standardDevice);// 标准器
			jsonObject.put("fullRangeData", fullRangeData);// 全检量程区段
			jsonObject.put("notFullRangeData", notFullRangeData);// 非全检量程区段

			WordCreation wordTest = new WordCreation();
			wordTest.createJyOriginFile(reaPath,jsonObject.toString());
			p = true;
		}
		String flag;
		if (result && p) {
			flag = "1";
		} else {
			flag = "0";
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}

	/**
	 * 方法序号：9_2 生成绝缘电阻表检定证书记录
	 */
	public void createJYCertificate() throws IOException {
		String zsbh = this.getRequest().getParameter("zsbh");// 送检仪器证书编号
		InspectionDecLeft ins = new InspectionDecLeft();
		ins.setZsbh(zsbh);
		ins.setWg(this.getRequest().getParameter("value1"));
		ins.setJydz(this.getRequest().getParameter("value2"));
		ins.setJyqd(this.getRequest().getParameter("value3"));
		ins.setXsnl(this.getRequest().getParameter("value4"));
		ins.setKlcldy(this.getRequest().getParameter("value5"));
		ins.setDldy(this.getRequest().getParameter("value6"));
		ins.setDndywdx(this.getRequest().getParameter("value7"));
		ins.setQxyyjy(this.getRequest().getParameter("value8"));
		ins.setJdjl(this.getRequest().getParameter("value9"));
		
		String reaPath=this.getServletContext().getRealPath("");
//		System.out.println(ins.toString());
		boolean result = rpService.addInspectionDecLeft(ins);// 添加绝缘电阻表剩余部分数据到数据库
		boolean p = false;
		if (result) {
			String inspectionDevice = rpService.findOneInspectionDevice(zsbh);// 送检仪器
			JSONArray jsonArray = new JSONArray(inspectionDevice);

			String standardDevLX = jsonArray.getJSONObject(0).getString(
					"staDevLX");// 送检仪器和标准器关系
			String standardDevice = rpService
					.findOneStandardDevice(standardDevLX);// 标准器
			String fullRangeData = rpService.findFullRangeDataById(zsbh);// 全检量程区段
			String notFullRangeData = rpService.findNotFullRangeDataById(zsbh);// 非全检量程区段

			JSONObject jsonObject = new JSONObject();
			jsonObject.put("inspectionDevice", inspectionDevice);// 送检仪器
			jsonObject.put("standardDevice", standardDevice);// 标准器
			jsonObject.put("fullRangeData", fullRangeData);// 全检量程区段
			jsonObject.put("notFullRangeData", notFullRangeData);// 非全检量程区段

			WordCreation wordTest = new WordCreation();
			wordTest.createJyCertifFile(reaPath,jsonObject.toString());

			p = true;
		}
		String flag;
		if (result && p) {
			flag = "1";
		} else {
			flag = "0";
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}

	/**
	 * 方法序号：9_3 生成接地电阻表原始记录证书
	 */
	public void createJDOriginal() throws IOException {
		String zsbh = this.getRequest().getParameter("zsbh");// 送检仪器证书编号
		InspectionDecLeft ins = new InspectionDecLeft();
		ins.setZsbh(zsbh);
		ins.setWg(this.getRequest().getParameter("value1"));
		ins.setJydz(this.getRequest().getParameter("value2"));
		ins.setJyqd(this.getRequest().getParameter("value3"));
		ins.setTdjc(this.getRequest().getParameter("value4"));

		String reaPath=this.getServletContext().getRealPath("");
//		System.out.println(reaPath);
		boolean result = rpService.addInspectionDecLeft(ins);// 添加绝缘电阻表剩余部分数据到数据库
		boolean p = false;
		if (result) {
			String inspectionDevice = rpService.findOneInspectionDevice(zsbh);// 送检仪器
			JSONArray jsonArray = new JSONArray(inspectionDevice);

			String standardDevLX = jsonArray.getJSONObject(0).getString(
					"staDevLX");// 送检仪器和标准器关系
			String standardDevice = rpService
					.findOneStandardDevice(standardDevLX);// 标准器
			String fullRangeData = rpService.findFullRangeDataById(zsbh);// 全检量程区段
			String notFullRangeData = rpService.findNotFullRangeDataById(zsbh);// 非全检量程区段
			String positionEffectData = rpService
					.findPositionEffectDataById(zsbh);// 位置影响试验数据
			String assistantData = rpService.findAssistantDataById(zsbh);// 辅助接地电阻影响试验数据

			JSONObject jsonObject = new JSONObject();
			jsonObject.put("inspectionDevice", inspectionDevice);// 送检仪器
			jsonObject.put("standardDevice", standardDevice);// 标准器
			jsonObject.put("fullRangeData", fullRangeData);// 全检量程区段
			jsonObject.put("notFullRangeData", notFullRangeData);// 非全检量程区段
			jsonObject.put("positionEffectData", positionEffectData);// 位置影响试验数据
			jsonObject.put("assistantData", assistantData);// 辅助接地电阻影响试验数据

			WordCreation wordTest = new WordCreation();
			wordTest.createJdOriginFile(reaPath,jsonObject.toString());
			p = true;
		}
		String flag;
		if (result && p) {
			flag = "1";
		} else {
			flag = "0";
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}

	/**
	 * 方法序号：9_4 生成接地电阻表检定证书
	 */
	public void createJDCertificate() throws IOException {
		String zsbh = this.getRequest().getParameter("zsbh");// 送检仪器证书编号
		InspectionDecLeft ins = new InspectionDecLeft();
		ins.setZsbh(zsbh);
		ins.setWg(this.getRequest().getParameter("value1"));
		ins.setJydz(this.getRequest().getParameter("value2"));
		ins.setJyqd(this.getRequest().getParameter("value3"));
		ins.setTdjc(this.getRequest().getParameter("value4"));
		ins.setWzyxsy(this.getRequest().getParameter("value5"));
		ins.setFzjddzyxsy(this.getRequest().getParameter("value6"));
		ins.setJdjl(this.getRequest().getParameter("value7"));
		
		String reaPath=this.getServletContext().getRealPath("");
		// System.out.println(ins.toString());
		boolean result = rpService.addInspectionDecLeft(ins);// 添加绝缘电阻表剩余部分数据到数据库

		boolean p = false;
		if (result) {
			String inspectionDevice = rpService.findOneInspectionDevice(zsbh);// 送检仪器
			JSONArray jsonArray = new JSONArray(inspectionDevice);

			String standardDevLX = jsonArray.getJSONObject(0).getString(
					"staDevLX");// 送检仪器和标准器关系
			String standardDevice = rpService
					.findOneStandardDevice(standardDevLX);// 标准器
			String fullRangeData = rpService.findFullRangeDataById(zsbh);// 全检量程区段
			String notFullRangeData = rpService.findNotFullRangeDataById(zsbh);// 非全检量程区段
			// System.out.println(standardDevice);
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("inspectionDevice", inspectionDevice);// 送检仪器
			jsonObject.put("standardDevice", standardDevice);// 标准器
			jsonObject.put("fullRangeData", fullRangeData);// 全检量程区段
			jsonObject.put("notFullRangeData", notFullRangeData);// 非全检量程区段
			// System.out.println(jsonObject.toString());
			WordCreation wordTest = new WordCreation();
			wordTest.createJdCertifFile(reaPath,jsonObject.toString());

			p = true;
		}
		String flag;
		if (result && p) {
			flag = "1";
		} else {
			flag = "0";
		}
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", flag);
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}

	// /**
	// * 模拟下位机 端口选择
	// *
	// * @throws IOException
	// */
	// public void listPorts1() throws IOException {
	// String result = moniSerialPort.listPort();
	// JSONArray allJsonArray = JSONArray.fromObject(result);
	// JSONObject jo = new JSONObject();
	// jo.put("allJsonArray", allJsonArray);
	// this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
	// this.getResponse().getWriter().print(jo);// 向前台发送json数据
	// }
	//
	// /**
	// * 模拟下位机 打开指定端口
	// *
	// * @throws IOException
	// */
	// public void openPort1() throws IOException {
	// String portName = this.getRequest().getParameter("port");
	// // 第一步 上位机发送：fe 68 11 00 00 0b b9 d5 16
	// byte[] swjOutPut1 = { (byte) 0xfe, 0x68, 17, 0, 0, 11, -71, -43, 22 };
	// // 第二步 下位机发送：FE 68 20 00 00 0b b9 e4 16 (发送密码)
	// byte[] xwjInPut = { -2, 104, 32, 0, 0, 11, -71, -28, 22 };
	// // 第三步 上位机发送: fe 68 22 00 00 0b ba e7 16 (密码比对成功)
	// byte[] swjOutPut2 = { -2, 104, 34, 0, 0, 11, -70, -25, 22 };
	// moniSerialPort.selectPort(portName);
	// JSONObject jo = new JSONObject();
	// jo.put("jsonObject", "1");
	// this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
	// this.getResponse().getWriter().print(jo);// 向前台发送json数据
	// moniSerialPort.startRead();// 单位毫秒
	// }
	//
	// /**
	// * 模拟下位机 关闭端口
	// *
	// * @throws IOException
	// */
	// public void closePort1() throws IOException {
	// moniSerialPort.close();
	// JSONObject jo = new JSONObject();
	// jo.put("jsonObject", "1");
	// this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
	// this.getResponse().getWriter().print(jo);// 向前台发送json数据
	// }

	/**
	 * 打开本地指定目录
	 */
	public void openLocalDisk() throws IOException {
		String certificatesPath = "D:\\电阻表模板和证书\\证书";
		new CopyFile().openFolder(certificatesPath);
		JSONObject jo = new JSONObject();
		jo.put("jsonObject", "1");
		this.getResponse().setContentType("text/html;charset=UTF-8");// 设置响应数据类型
		this.getResponse().getWriter().print(jo);// 向前台发送json数据
	}

}

package test;

import java.math.BigDecimal;


public class TestDemo1 {
	
    /**小数点之后保留几位小数(此处，我们用BigDecimal提供的（除以div）方法实现) 
     * @param oldDouble 
     * @param scale 
     * @return 
     */  
    public static double decimal(double oldDouble, int scale) {  
        if (scale < 0) {  
            throw new IllegalArgumentException(  
                    "The scale must be a positive integer or zero");  
        }  
        BigDecimal b = new BigDecimal(Double.toString(oldDouble));  
        BigDecimal one = new BigDecimal("1");  
        //return b.divide(one, scale, BigDecimal.ROUND_FLOOR).doubleValue();  
        if(oldDouble>0){  
            //此处的scale表示的是，小数点之后的精度。  
            return b.divide(one, scale, BigDecimal.ROUND_DOWN).doubleValue();  
        }else{  
            return b.divide(one, scale, BigDecimal.ROUND_UP).doubleValue();  
        }  
    }  
    public static void main(String[] args) {
        float d = 1111.56565f;  
        int scale = 4;  
        double d2 = decimal(d,scale);  
        System.out.println(d+"保留小数点之后"+scale+"位小数："+d2);  
          
    }  
	

}

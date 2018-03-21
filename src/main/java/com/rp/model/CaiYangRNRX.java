package com.rp.model;

/**
 * 全检量程区段和非全检量程区段
 */
public class CaiYangRNRX {

	private String zsbh;// 送检仪器证书编号
	private String standardvalue;// 标准值RN
	private String readvalue;// 读数值RX
	private String dw;// 单位
	private int id;// 顺序

	public CaiYangRNRX() {
		super();
		this.zsbh = "";
		this.standardvalue = "";
		this.readvalue = "";
		this.dw = "";
		this.id = 0;
	}

	public String getZsbh() {
		return zsbh;
	}

	public void setZsbh(String zsbh) {
		this.zsbh = zsbh;
	}

	public String getStandardvalue() {
		return standardvalue;
	}

	public void setStandardvalue(String standardvalue) {
		this.standardvalue = standardvalue;
	}

	public String getReadvalue() {
		return readvalue;
	}

	public void setReadvalue(String readvalue) {
		this.readvalue = readvalue;
	}

	public String getDw() {
		return dw;
	}

	public void setDw(String dw) {
		this.dw = dw;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return "CaiYangRNRX [zsbh=" + zsbh + ", standardvalue=" + standardvalue
				+ ", readvalue=" + readvalue + ", dw=" + dw + ", id=" + id
				+ "]";
	}

}

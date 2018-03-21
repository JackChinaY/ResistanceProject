package com.rp.model;
/**
 * Part4 辅助接地电阻影响试验
 */
public class AssistantData {
	private String zsbh;//送检仪器证书编号
	private String lc;//各量程实际值
	private String value_0;
	private String value_500;
	private String value_1000;
	private String value_2000;
	private String value_5000;
	private String dw;//单位
	private int id;//顺序
	
	public AssistantData() {
		super();
		this.zsbh = "";
		this.lc = "";
		this.value_0 = "";
		this.value_500 = "";
		this.value_1000 = "";
		this.value_2000 = "";
		this.value_5000 = "";
		this.dw = "";
		this.id = 0;
	}
	public String getZsbh() {
		return zsbh;
	}
	public void setZsbh(String zsbh) {
		this.zsbh = zsbh;
	}
	public String getLc() {
		return lc;
	}
	public void setLc(String lc) {
		this.lc = lc;
	}
	public String getValue_0() {
		return value_0;
	}
	public void setValue_0(String value_0) {
		this.value_0 = value_0;
	}
	public String getValue_500() {
		return value_500;
	}
	public void setValue_500(String value_500) {
		this.value_500 = value_500;
	}
	public String getValue_1000() {
		return value_1000;
	}
	public void setValue_1000(String value_1000) {
		this.value_1000 = value_1000;
	}
	public String getValue_2000() {
		return value_2000;
	}
	public void setValue_2000(String value_2000) {
		this.value_2000 = value_2000;
	}
	public String getValue_5000() {
		return value_5000;
	}
	public void setValue_5000(String value_5000) {
		this.value_5000 = value_5000;
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
		return "AssistantData [zsbh=" + zsbh + ", lc=" + lc + ", value_0="
				+ value_0 + ", value_500=" + value_500 + ", value_1000="
				+ value_1000 + ", value_2000=" + value_2000 + ", value_5000="
				+ value_5000 + ", dw=" + dw + ", id=" + id + "]";
	}
	
	
	
}

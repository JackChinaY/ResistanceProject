package com.rp.model;

public class InspectionDevice {

	private String leixing;
	private String xinghao;
	private String yqmc;
	private String yqbh;
	private String sjdw;
	private String zqddj;
	private String clfw;
	private String sccj;
	private String jddd;
	private String wendu;
	private String shidu;
	private String jdsj;
	private String yxqsj;
	private String jdyj;
	private String zsbh;
	private String staDevLX;//对应的标准器型号
	
	public InspectionDevice() {
		super();
		this.leixing = "";
		this.xinghao = "";
		this.yqmc = "";
		this.yqbh = "";
		this.sjdw = "";
		this.zqddj = "";
		this.clfw = "";
		this.sccj = "";
		this.jddd = "";
		this.wendu = "";
		this.shidu = "";
		this.jdsj = "";
		this.yxqsj = "";
		this.jdyj = "";
		this.zsbh = "";
		this.staDevLX="";
	}
	public String getLeixing() {
		return leixing;
	}
	public void setLeixing(String leixing) {
		this.leixing = leixing;
	}
	public String getXinghao() {
		return xinghao;
	}
	public void setXinghao(String xinghao) {
		this.xinghao = xinghao;
	}
	public String getYqmc() {
		return yqmc;
	}
	public void setYqmc(String yqmc) {
		this.yqmc = yqmc;
	}
	public String getYqbh() {
		return yqbh;
	}
	public void setYqbh(String yqbh) {
		this.yqbh = yqbh;
	}
	public String getSjdw() {
		return sjdw;
	}
	public void setSjdw(String sjdw) {
		this.sjdw = sjdw;
	}
	public String getZqddj() {
		return zqddj;
	}
	public void setZqddj(String zqddj) {
		this.zqddj = zqddj;
	}
	public String getClfw() {
		return clfw;
	}
	public void setClfw(String clfw) {
		this.clfw = clfw;
	}
	public String getSccj() {
		return sccj;
	}
	public void setSccj(String sccj) {
		this.sccj = sccj;
	}
	public String getJddd() {
		return jddd;
	}
	public void setJddd(String jddd) {
		this.jddd = jddd;
	}
	public String getWendu() {
		return wendu;
	}
	public void setWendu(String wendu) {
		this.wendu = wendu;
	}
	public String getShidu() {
		return shidu;
	}
	public void setShidu(String shidu) {
		this.shidu = shidu;
	}
	public String getJdsj() {
		return jdsj;
	}
	public void setJdsj(String jdsj) {
		this.jdsj = jdsj;
	}
	public String getYxqsj() {
		return yxqsj;
	}
	public void setYxqsj(String yxqsj) {
		this.yxqsj = yxqsj;
	}
	public String getJdyj() {
		return jdyj;
	}
	public void setJdyj(String jdyj) {
		this.jdyj = jdyj;
	}
	public String getZsbh() {
		return zsbh;
	}
	public void setZsbh(String zsbh) {
		this.zsbh = zsbh;
	}
	public String getStaDevLX() {
		return staDevLX;
	}
	public void setStaDevLX(String staDevLX) {
		this.staDevLX = staDevLX;
	}
	@Override
	public String toString() {
		return "InspectionDevice [leixing=" + leixing + ", xinghao=" + xinghao
				+ ", yqmc=" + yqmc + ", yqbh=" + yqbh + ", sjdw=" + sjdw
				+ ", zqddj=" + zqddj + ", clfw=" + clfw + ", sccj=" + sccj
				+ ", jddd=" + jddd + ", wendu=" + wendu + ", shidu=" + shidu
				+ ", jdsj=" + jdsj + ", yxqsj=" + yxqsj + ", jdyj=" + jdyj
				+ ", zsbh=" + zsbh + ", staDevLX=" + staDevLX + "]";
	}
	
	
}

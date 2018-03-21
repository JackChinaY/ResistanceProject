package com.rp.model;

public class StandardDevice {
	private String xinghao;
	private String mingchen;
	private String yqbh;
	private String bqdd;
	private String jlbzzsh;
	private String yxqz;
	private String lx;//类型
	public StandardDevice() {
		super();
		this.xinghao = "";
		this.mingchen = "";
		this.yqbh = "";
		this.bqdd = "";
		this.jlbzzsh = "";
		this.yxqz = "";
		this.lx="";
	}
	public String getXinghao() {
		return xinghao;
	}
	public void setXinghao(String xinghao) {
		this.xinghao = xinghao;
	}
	public String getMingchen() {
		return mingchen;
	}
	public void setMingchen(String mingchen) {
		this.mingchen = mingchen;
	}
	public String getYqbh() {
		return yqbh;
	}
	public void setYqbh(String yqbh) {
		this.yqbh = yqbh;
	}
	public String getBqdd() {
		return bqdd;
	}
	public void setBqdd(String bqdd) {
		this.bqdd = bqdd;
	}
	public String getJlbzzsh() {
		return jlbzzsh;
	}
	public void setJlbzzsh(String jlbzzsh) {
		this.jlbzzsh = jlbzzsh;
	}
	public String getYxqz() {
		return yxqz;
	}
	public void setYxqz(String yxqz) {
		this.yxqz = yxqz;
	}
	public String getLx() {
		return lx;
	}
	public void setLx(String lx) {
		this.lx = lx;
	}
	@Override
	public String toString() {
		return "StandardDevice [xinghao=" + xinghao + ", mingchen=" + mingchen
				+ ", yqbh=" + yqbh + ", bqdd=" + bqdd + ", jlbzzsh=" + jlbzzsh
				+ ", yxqz=" + yxqz + ", lx=" + lx + "]";
	}
	
	
	
	

}

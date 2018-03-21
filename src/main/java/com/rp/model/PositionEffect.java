package com.rp.model;

/**
 * Part3 位置影响试验
 */
public class PositionEffect {
	private String zsbh;// 送检仪器证书编号
	private String lc;// 量程
	private String front;// 前
	private String back;// 后
	private String left;// 左
	private String right;// 右
	private String dw;// 单位
	private int id;//顺序
	
	public PositionEffect() {
		super();
		this.zsbh = "";
		this.lc = "";
		this.front = "";
		this.back = "";
		this.left = "";
		this.right = "";
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

	public String getFront() {
		return front;
	}

	public void setFront(String front) {
		this.front = front;
	}

	public String getBack() {
		return back;
	}

	public void setBack(String back) {
		this.back = back;
	}

	public String getLeft() {
		return left;
	}

	public void setLeft(String left) {
		this.left = left;
	}

	public String getRight() {
		return right;
	}

	public void setRight(String right) {
		this.right = right;
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
		return "PositionEffect [zsbh=" + zsbh + ", lc=" + lc + ", front="
				+ front + ", back=" + back + ", left=" + left + ", right="
				+ right + ", dw=" + dw + ", id=" + id + "]";
	}

	

}

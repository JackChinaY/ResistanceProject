package com.rp.utility;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.File;

public class WordCreation {

	private String modelsPath = "D:\\电阻表模板和证书\\模板";
	private String certificatesPath = "D:\\电阻表模板和证书\\证书";
	private String jdVertif = "接地电阻表检定证书.doc";
	private String jdOrigin = "接地电阻表原始记录.doc";
	private String jyVertif = "绝缘电阻表检定证书.doc";
	private String jyOrigin = "绝缘电阻表原始记录.doc";

	/**
	 * 1.在本地D盘上创建D:\电阻表模板和证书\模板和证书两个文件夹   如果没有就新建此文件夹
	 * 2.将项目中的模板文件拷贝到此新建的文件夹中  如果没有就复制此文件
	 */
	public void copyFiles(String realPath) {

		CopyFile f = new CopyFile();
		f.newFolder(modelsPath);// 新建模板路径
		f.newFolder(certificatesPath);// 新建证书路径

		// 复制 接地电阻表检定证书.doc
		File modelsFile1 = new File(modelsPath + "\\" + jdVertif);
		if (!modelsFile1.exists()) {
			f.copyFile(realPath + "\\Documents\\Models\\" + jdVertif, modelsPath + "\\"
					+ jdVertif);
//			System.out.println("复制成功1");
		}

		// 复制 接地电阻表原始记录.doc
		File modelsFile2 = new File(modelsPath + "\\" + jdOrigin);
		if (!modelsFile2.exists()) {
			f.copyFile(realPath + "/Documents/Models/" + jdOrigin, modelsPath + "\\"
					+ jdOrigin);
//			System.out.println("复制成功2");
		}

		// 复制 绝缘电阻表检定证书.doc
		File modelsFile3 = new File(modelsPath + "\\" + jyVertif);
		if (!modelsFile3.exists()) {
			f.copyFile(realPath + "/Documents/Models/" + jyVertif, modelsPath + "\\"
					+ jyVertif);
//			System.out.println("复制成功3");
		}
		// 复制 绝缘电阻表原始记录.doc
		File modelsFile4 = new File(modelsPath + "\\" + jyOrigin);
		if (!modelsFile4.exists()) {
			f.copyFile(realPath + "/Documents/Models/" + jyOrigin, modelsPath + "\\"
					+ jyOrigin);
//			System.out.println("复制成功4");
		}
	}

	/**
	 * 1生成 接地电阻表检定证书.doc
	 */
	public void createJdCertifFile(String realPath,String result) {
		this.copyFiles(realPath);
		// 生成一个MSwordManager对象,并且设置显示Word程序
		WordManager ms = new WordManager(false);

		// 打开模板文件
		ms.openDocument(modelsPath + "\\" + jdVertif);
		JSONObject jo = new JSONObject(result);
		String inspectionDevice = jo.getString("inspectionDevice");// 送检仪器
		String standardDevice = jo.getString("standardDevice");// 标准器
		String fullRangeData = jo.getString("fullRangeData");// 全检量程区段
		String notFullRangeData = jo.getString("notFullRangeData");// 非全检量程区段

		JSONArray jsonArrayID = new JSONArray(inspectionDevice);// 送检仪器
		JSONArray jsonArraySD = new JSONArray(standardDevice);// 标准器
		JSONArray jsonArrayFR = new JSONArray(fullRangeData);// 全检量程区段
		JSONArray jsonArrayNFR = new JSONArray(notFullRangeData);// 非全检量程区段

		JSONObject joID = jsonArrayID.getJSONObject(0);// 送检仪器
		JSONObject joSD = jsonArraySD.getJSONObject(0);// 标准器
		// System.out.println(joID.toString());
		// 替换内容， 参数一为要查找的内容，参数二为替换后的新内容
		ms.replaceText("P1_1_0", joID.getString("zsbh"));// 证书编号
		ms.replaceText("P1_2_0", joID.getString("sjdw"));// 送检单位
		ms.replaceText("P1_3_0", joID.getString("yqmc"));// 计量器具名称
		ms.replaceAllText("P1_4_0", joID.getString("xinghao"));// 型号规格
		ms.replaceAllText("P1_5_0", joID.getString("zqddj"));// 准确度等级
		ms.replaceAllText("P1_6_0", joID.getString("sccj"));// 生产厂家
		ms.replaceAllText("P1_7_0", joID.getString("yqbh"));// 出厂编号
		ms.replaceAllText("P1_8_0", joID.getString("jdjl"));// 鉴定结论
		ms.replaceAllText("P1_9_0", DateTimeOperation(joID.getString("jdsj")));// 检定日期
		ms.replaceAllText("P1_10", DateTimeOperation(joID.getString("yxqsj")));// 有效日期
		ms.replaceAllText("P1_11", joID.getString("jdyj"));// 检定依据
		ms.replaceAllText("P1_12", joSD.getString("mc"));// 计量标准器具名称
		ms.replaceAllText("P1_13", joSD.getString("xh"));// 型号
		ms.replaceAllText("P1_14", joSD.getString("yqbh"));// 仪器编号
		ms.replaceAllText("P1_15", joSD.getString("bqdd"));// 不确定度
		ms.replaceAllText("P1_16", joSD.getString("jlbzzsh"));// 计量标准证书号
		ms.replaceAllText("P1_17", DateTimeOperation(joSD.getString("yxqz")));// 有效期至
		ms.replaceAllText("P1_18", joID.getString("jddd"));// 检定地点
		ms.replaceAllText("P1_19", joID.getString("wendu"));// 温度
		ms.replaceAllText("P1_20", joID.getString("shidu"));// 湿度

		ms.replaceAllText("P1_21", joID.getString("wg"));// 外观
		ms.replaceAllText("P1_22", joID.getString("tdjc"));// 通电检查
		ms.replaceAllText("P1_23", joID.getString("jydz"));// 绝缘电阻
		ms.replaceAllText("P1_24", joID.getString("jyqd"));// 绝缘强度
		ms.replaceAllText("P1_25", joID.getString("wzyxsy"));// 位置影响试验
		ms.replaceAllText("P1_26", joID.getString("fzjddzyxsy"));// 辅助接地电阻影响试验
		// ms.replaceAllText("P1_41", joID.getString("clfw"));// 测量范围
		// ms.replaceAllText("P1_30", joID.getString("xsnl"));// 显示能力
		// ms.replaceAllText("P1_31", joID.getString("klcldy"));// 开路测量电压
		// ms.replaceAllText("P1_32", joID.getString("dldy"));// 跌落（中值）电压
		// ms.replaceAllText("P1_33", joID.getString("dndywdx"));// 端钮电压稳定性
		// ms.replaceAllText("P1_34", joID.getString("qxyyjy"));// 倾斜影响检验
		ms.replaceAllText("P1_42", UnitChange(jsonArrayFR.getJSONObject(0)
				.getString("dw")));// 全检量程区段单位
		ms.replaceAllText("P1_43", UnitChange(jsonArrayNFR.getJSONObject(0)
				.getString("dw")));// 非全检量程区段单位1
		ms.replaceAllText("P1_44", UnitChange(jsonArrayNFR.getJSONObject(3)
				.getString("dw")));// 非全检量程区段单位2
		ms.replaceAllText("P1_45", UnitChange(jsonArrayNFR.getJSONObject(6)
				.getString("dw")));// 非全检量程区段单位3

		ms.setHeader("P1_1_0", joID.getString("zsbh"));// 替换页眉中的内容，只做一次操作

		// 全检量程区段数据
		try {

			for (int i = 0; i < jsonArrayFR.length(); i++) {
				double standardvalue = jsonArrayFR.getJSONObject(i).getDouble(
						"standardvalue");
				double readvalue = jsonArrayFR.getJSONObject(i).getDouble(
						"readvalue");
				double errorrange = (Math.abs(readvalue - standardvalue))
						/ standardvalue * 100;
				jsonArrayFR.getJSONObject(i).put("errorrange",
						String.format("%.2f", errorrange));
			}
			// System.out.println(jsonArray.length());
			int tableIndex = 4;// word中第4张表格
			int rowBegin = 11;// 代表起始行1开始
			int rowEnd = 20;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				if ((i - rowBegin) < jsonArrayFR.length()) {
					ms.putTxtToCell(
							tableIndex,
							i,
							2,
							jsonArrayFR.getJSONObject(i - rowBegin).getString(
									"standardvalue"));
					ms.putTxtToCell(tableIndex, i, 3, jsonArrayFR
							.getJSONObject(i - rowBegin).getString("readvalue"));
					ms.putTxtToCell(tableIndex, i, 4, jsonArrayFR
							.getJSONObject(i - rowBegin)
							.getString("errorrange")
							+ "%");
				} else {
					ms.putTxtToCell(tableIndex, i, 2, "*---");
					ms.putTxtToCell(tableIndex, i, 3, "*---");
					ms.putTxtToCell(tableIndex, i, 4, "*---");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 非全检量程区段数据
		try {

			for (int i = 0; i < jsonArrayNFR.length(); i++) {
				if (jsonArrayNFR.getJSONObject(i).getString("standardvalue")
						.equals("*---")
						|| jsonArrayNFR.getJSONObject(i).getString("readvalue")
								.equals("*---")) {
					jsonArrayNFR.getJSONObject(i).put("errorrange", "*---");
				} else {
					double standardvalue = jsonArrayNFR.getJSONObject(i)
							.getDouble("standardvalue");
					double readvalue = jsonArrayNFR.getJSONObject(i).getDouble(
							"readvalue");
					double errorrange = (Math.abs(readvalue - standardvalue))
							/ standardvalue * 100;
					jsonArrayNFR.getJSONObject(i).put("errorrange",
							String.format("%.2f", errorrange) + "%");
				}

			}

			// 非全检量程区段数据 第一组
			int tableIndex = 4;// word中第3张表格
			int rowBegin = 11;// 代表起始行,从1开始
			int rowEnd = 13;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				ms.putTxtToCell(
						tableIndex,
						i,
						6,
						jsonArrayNFR.getJSONObject(i - rowBegin).getString(
								"standardvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						7,
						jsonArrayNFR.getJSONObject(i - rowBegin).getString(
								"readvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						8,
						jsonArrayNFR.getJSONObject(i - rowBegin).getString(
								"errorrange"));
			}

			// 非全检量程区段数据 第二组
			rowBegin = 16;// 代表起始行,从1开始
			rowEnd = 18;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				ms.putTxtToCell(
						tableIndex,
						i,
						6,
						jsonArrayNFR.getJSONObject(i - rowBegin + 3).getString(
								"standardvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						7,
						jsonArrayNFR.getJSONObject(i - rowBegin + 3).getString(
								"readvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						8,
						jsonArrayNFR.getJSONObject(i - rowBegin + 3).getString(
								"errorrange"));
			}

			// 非全检量程区段数据 第三组
			rowBegin = 21;// 代表起始行,从1开始
			rowEnd = 23;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				ms.putTxtToCell(
						tableIndex,
						i,
						6,
						jsonArrayNFR.getJSONObject(i - rowBegin + 6).getString(
								"standardvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						7,
						jsonArrayNFR.getJSONObject(i - rowBegin + 6).getString(
								"readvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						8,
						jsonArrayNFR.getJSONObject(i - rowBegin + 6).getString(
								"errorrange"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		String fileName = joID.getString("sjdw") + "_接地电阻表检定证书_"
				+ joID.getString("zsbh") + ".doc";

		// 判断文件是否存在，存在则删除
		new CopyFile().delFile(certificatesPath + "\\" + fileName);

		// 保存.doc文件
		ms.save(certificatesPath + "\\" + fileName);

		// 关闭全部应用
		ms.close();

//		new CopyFile().openFolder(certificatesPath);// 打开本地指定目录 D:\\电阻表模板和证书\\证书
		// 生成一个MSwordManager对象,并且设置显示Word程序// 打开模板文件
		new WordManager(true).openDocument(certificatesPath + "\\" + fileName);
	}

	/**
	 * 2生成 接地电阻表原始记录.doc
	 */
	public void createJdOriginFile(String realPath,String result) {
		this.copyFiles(realPath);
		// 生成一个MSwordManager对象,并且设置显示Word程序
		WordManager ms = new WordManager(false);
		// 打开模板文件
		ms.openDocument(modelsPath + "\\" + jdOrigin);

		JSONObject jo = new JSONObject(result);
		String inspectionDevice = jo.getString("inspectionDevice");// 送检仪器
		String standardDevice = jo.getString("standardDevice");// 标准器
		String fullRangeData = jo.getString("fullRangeData");// 全检量程区段
		String notFullRangeData = jo.getString("notFullRangeData");// 非全检量程区段
		String positionEffectData = jo.getString("positionEffectData");// 位置影响试验数据
		String assistantData = jo.getString("assistantData");// 辅助接地电阻影响试验数据

		JSONArray jsonArrayID = new JSONArray(inspectionDevice);// 送检仪器
		JSONArray jsonArraySD = new JSONArray(standardDevice);// 标准器
		JSONArray jsonArrayFR = new JSONArray(fullRangeData);// 全检量程区段
		JSONArray jsonArrayNFR = new JSONArray(notFullRangeData);// 非全检量程区段
		JSONArray jsonArrayPED = new JSONArray(positionEffectData);// 位置影响试验数据
		JSONArray jsonArrayAD = new JSONArray(assistantData);// 辅助接地电阻影响试验数据

		JSONObject joID = jsonArrayID.getJSONObject(0);// 送检仪器
		JSONObject joSD = jsonArraySD.getJSONObject(0);// 标准器

		// 替换内容， 参数一为要查找的内容，参数二为替换后的新内容
		ms.replaceText("P1_1_0", joID.getString("zsbh"));// 证书编号
		ms.replaceText("P1_2_0", joID.getString("sjdw"));// 送检单位
		ms.replaceText("P1_3_0", joID.getString("yqmc"));// 计量器具名称
		ms.replaceAllText("P1_4_0", joID.getString("xinghao"));// 型号规格
		ms.replaceAllText("P1_5_0", joID.getString("zqddj"));// 准确度等级
		ms.replaceAllText("P1_6_0", joID.getString("sccj"));// 生产厂家
		ms.replaceAllText("P1_7_0", joID.getString("yqbh"));// 出厂编号

		ms.replaceAllText("P1_9_0", DateTimeOperation(joID.getString("jdsj")));// 检定日期
		ms.replaceAllText("P1_10", DateTimeOperation(joID.getString("yxqsj")));// 有效日期
		ms.replaceAllText("P1_11", joID.getString("jdyj"));// 检定依据
		ms.replaceAllText("P1_12", joSD.getString("mc"));// 计量标准器具名称
		ms.replaceAllText("P1_13", joSD.getString("xh"));// 型号
		ms.replaceAllText("P1_14", joSD.getString("yqbh"));// 仪器编号
		ms.replaceAllText("P1_15", joSD.getString("bqdd"));// 不确定度
		ms.replaceAllText("P1_16", joSD.getString("jlbzzsh"));// 计量标准证书号
		ms.replaceAllText("P1_17", DateTimeOperation(joSD.getString("yxqz")));// 有效期至
		ms.replaceAllText("P1_18", joID.getString("jddd"));// 检定地点
		ms.replaceAllText("P1_19", joID.getString("wendu"));// 温度
		ms.replaceAllText("P1_20", joID.getString("shidu"));// 湿度

		ms.replaceAllText("P1_21", joID.getString("wg"));// 外观
		ms.replaceAllText("P1_22", joID.getString("tdjc"));// 通电检查
		ms.replaceAllText("P1_23", joID.getString("jydz"));// 绝缘电阻
		ms.replaceAllText("P1_24", joID.getString("jyqd"));// 绝缘强度
		ms.replaceAllText("P1_41", joID.getString("clfw"));// 测量范围
		ms.replaceAllText("P1_42", UnitChange(jsonArrayFR.getJSONObject(0)
				.getString("dw")));// 全检量程区段单位
		ms.replaceAllText("P1_43", UnitChange(jsonArrayNFR.getJSONObject(0)
				.getString("dw")));// 非全检量程区段单位1
		ms.replaceAllText("P1_44", UnitChange(jsonArrayNFR.getJSONObject(3)
				.getString("dw")));// 非全检量程区段单位2
		ms.replaceAllText("P1_45", UnitChange(jsonArrayNFR.getJSONObject(6)
				.getString("dw")));// 非全检量程区段单位3

		// 全检量程区段数据
		try {
			for (int i = 0; i < jsonArrayFR.length(); i++) {
				double standardvalue = jsonArrayFR.getJSONObject(i).getDouble(
						"standardvalue");
				double readvalue = jsonArrayFR.getJSONObject(i).getDouble(
						"readvalue");
				double errorrange = (Math.abs(readvalue - standardvalue))
						/ standardvalue * 100;
				jsonArrayFR.getJSONObject(i).put("errorrange",
						String.format("%.2f", errorrange));
			}
			int tableIndex = 3;// word中第3张表格
			int rowBegin = 9;// 代表起始行1开始
			int rowEnd = 18;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				if ((i - rowBegin) < jsonArrayFR.length()) {
					ms.putTxtToCell(
							tableIndex,
							i,
							2,
							jsonArrayFR.getJSONObject(i - rowBegin).getString(
									"standardvalue"));
					ms.putTxtToCell(tableIndex, i, 3, jsonArrayFR
							.getJSONObject(i - rowBegin).getString("readvalue"));
					ms.putTxtToCell(tableIndex, i, 4, jsonArrayFR
							.getJSONObject(i - rowBegin)
							.getString("errorrange")
							+ "%");
				} else {
					ms.putTxtToCell(tableIndex, i, 2, "*---");
					ms.putTxtToCell(tableIndex, i, 3, "*---");
					ms.putTxtToCell(tableIndex, i, 4, "*---");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 非全检量程区段数据
		try {

			for (int i = 0; i < jsonArrayNFR.length(); i++) {
				if (jsonArrayNFR.getJSONObject(i).getString("standardvalue")
						.equals("*---")
						|| jsonArrayNFR.getJSONObject(i).getString("readvalue")
								.equals("*---")) {
					jsonArrayNFR.getJSONObject(i).put("errorrange", "*---");
				} else {
					double standardvalue = jsonArrayNFR.getJSONObject(i)
							.getDouble("standardvalue");
					double readvalue = jsonArrayNFR.getJSONObject(i).getDouble(
							"readvalue");
					double errorrange = (Math.abs(readvalue - standardvalue))
							/ standardvalue * 100;
					jsonArrayNFR.getJSONObject(i).put("errorrange",
							String.format("%.2f", errorrange) + "%");
				}

			}

			// 非全检量程区段数据 第一组
			int tableIndex = 3;// word中第3张表格
			int rowBegin = 9;// 代表起始行,从1开始
			int rowEnd = 11;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				ms.putTxtToCell(
						tableIndex,
						i,
						6,
						jsonArrayNFR.getJSONObject(i - rowBegin).getString(
								"standardvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						7,
						jsonArrayNFR.getJSONObject(i - rowBegin).getString(
								"readvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						8,
						jsonArrayNFR.getJSONObject(i - rowBegin).getString(
								"errorrange"));
			}

			// 非全检量程区段数据 第二组
			rowBegin = 14;// 代表起始行,从1开始
			rowEnd = 16;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				ms.putTxtToCell(
						tableIndex,
						i,
						6,
						jsonArrayNFR.getJSONObject(i - rowBegin + 3).getString(
								"standardvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						7,
						jsonArrayNFR.getJSONObject(i - rowBegin + 3).getString(
								"readvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						8,
						jsonArrayNFR.getJSONObject(i - rowBegin + 3).getString(
								"errorrange"));
			}

			// 非全检量程区段数据 第三组
			rowBegin = 19;// 代表起始行,从1开始
			rowEnd = 21;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				ms.putTxtToCell(
						tableIndex,
						i,
						6,
						jsonArrayNFR.getJSONObject(i - rowBegin + 6).getString(
								"standardvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						7,
						jsonArrayNFR.getJSONObject(i - rowBegin + 6).getString(
								"readvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						8,
						jsonArrayNFR.getJSONObject(i - rowBegin + 6).getString(
								"errorrange"));
			}

			// 位置影响试验 开始
			rowBegin = 24;// 代表起始行,从1开始
			rowEnd = 26;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				if (jsonArrayPED.getJSONObject(i - rowBegin)
						.getString("lc_value").equals("*---")) {
					ms.putTxtToCell(tableIndex, i, 1, jsonArrayPED
							.getJSONObject(i - rowBegin).getString("lc_value"));
				} else {
					ms.putTxtToCell(
							tableIndex,
							i,
							1,
							jsonArrayPED.getJSONObject(i - rowBegin).getString(
									"lc_value")
									+ UnitChange(jsonArrayPED.getJSONObject(
											i - rowBegin).getString("dw")));
				}

				ms.putTxtToCell(
						tableIndex,
						i,
						2,
						jsonArrayPED.getJSONObject(i - rowBegin).getString(
								"front_value"));
				ms.putTxtToCell(
						tableIndex,
						i,
						3,
						jsonArrayPED.getJSONObject(i - rowBegin).getString(
								"back_value"));
				ms.putTxtToCell(
						tableIndex,
						i,
						4,
						jsonArrayPED.getJSONObject(i - rowBegin).getString(
								"left_value"));
				ms.putTxtToCell(
						tableIndex,
						i,
						5,
						jsonArrayPED.getJSONObject(i - rowBegin).getString(
								"right_value"));
			}

			// 辅助接地电阻影响试验
			tableIndex = 4;
			rowBegin = 3;// 代表起始行,从1开始
			rowEnd = 5;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				if (jsonArrayAD.getJSONObject(i - rowBegin).getString("lc")
						.equals("*---")) {
					ms.putTxtToCell(tableIndex, i, 1, jsonArrayAD
							.getJSONObject(i - rowBegin).getString("lc"));
				} else {
					ms.putTxtToCell(tableIndex, i, 1, jsonArrayAD
							.getJSONObject(i - rowBegin).getString("lc")
							+ UnitChange(jsonArrayAD
									.getJSONObject(i - rowBegin)
									.getString("dw")));
				}

				ms.putTxtToCell(
						tableIndex,
						i,
						2,
						jsonArrayAD.getJSONObject(i - rowBegin).getString(
								"value_0"));
				ms.putTxtToCell(
						tableIndex,
						i,
						3,
						jsonArrayAD.getJSONObject(i - rowBegin).getString(
								"value_500"));
				ms.putTxtToCell(
						tableIndex,
						i,
						4,
						jsonArrayAD.getJSONObject(i - rowBegin).getString(
								"value_1000"));
				ms.putTxtToCell(
						tableIndex,
						i,
						5,
						jsonArrayAD.getJSONObject(i - rowBegin).getString(
								"value_2000"));
				ms.putTxtToCell(
						tableIndex,
						i,
						6,
						jsonArrayAD.getJSONObject(i - rowBegin).getString(
								"value_5000"));
			}
		} catch (Exception e) {
			System.out.println("生成 接地电阻表原始记录.doc时出错！");
			e.printStackTrace();
		}

		String fileName = joID.getString("sjdw") + "_接地电阻表原始记录_"
				+ joID.getString("zsbh") + ".doc";

		// 判断文件是否存在，存在则删除
		new CopyFile().delFile(certificatesPath + "\\" + fileName);

		// 保存.doc文件
		ms.save(certificatesPath + "\\" + fileName);

		// 关闭全部应用
		ms.close();

//		new CopyFile().openFolder(certificatesPath);// 打开本地指定目录 D:\\电阻表模板和证书\\证书
		// 生成一个MSwordManager对象,并且设置显示Word程序// 打开模板文件
		new WordManager(true).openDocument(certificatesPath + "\\" + fileName);
	}

	/**
	 * 3生成 绝缘电阻表检定证书.doc
	 */
	public void createJyCertifFile(String realPath,String result) {
		this.copyFiles(realPath);
		// 生成一个MSwordManager对象,并且设置显示Word程序
		WordManager ms = new WordManager(false);
		// 打开模板文件
		ms.openDocument(modelsPath + "\\" + jyVertif);

		JSONObject jo = new JSONObject(result);
		String inspectionDevice = jo.getString("inspectionDevice");// 送检仪器
		String standardDevice = jo.getString("standardDevice");// 标准器
		String fullRangeData = jo.getString("fullRangeData");// 全检量程区段
		String notFullRangeData = jo.getString("notFullRangeData");// 非全检量程区段

		JSONArray jsonArrayID = new JSONArray(inspectionDevice);// 送检仪器
		JSONArray jsonArraySD = new JSONArray(standardDevice);// 标准器
		JSONArray jsonArrayFR = new JSONArray(fullRangeData);// 全检量程区段
		JSONArray jsonArrayNFR = new JSONArray(notFullRangeData);// 非全检量程区段

		JSONObject joID = jsonArrayID.getJSONObject(0);// 送检仪器
		JSONObject joSD = jsonArraySD.getJSONObject(0);// 标准器

		// 替换内容， 参数一为要查找的内容，参数二为替换后的新内容
		ms.replaceText("P1_1_0", joID.getString("zsbh"));// 证书编号
		ms.replaceText("P1_2_0", joID.getString("sjdw"));// 送检单位
		ms.replaceText("P1_3_0", joID.getString("yqmc"));// 计量器具名称
		ms.replaceAllText("P1_4_0", joID.getString("xinghao"));// 型号规格
		ms.replaceAllText("P1_5_0", joID.getString("zqddj"));// 准确度等级
		ms.replaceAllText("P1_6_0", joID.getString("sccj"));// 生产厂家
		ms.replaceAllText("P1_7_0", joID.getString("yqbh"));// 出厂编号
		ms.replaceAllText("P1_8_0", joID.getString("jdjl"));// 鉴定结论
		ms.replaceAllText("P1_9_0", DateTimeOperation(joID.getString("jdsj")));// 检定日期
		ms.replaceAllText("P1_10", DateTimeOperation(joID.getString("yxqsj")));// 有效日期
		ms.replaceAllText("P1_11", joID.getString("jdyj"));// 检定依据
		ms.replaceAllText("P1_12", joSD.getString("mc"));// 计量标准器具名称
		ms.replaceAllText("P1_13", joSD.getString("xh"));// 型号
		ms.replaceAllText("P1_14", joSD.getString("yqbh"));// 仪器编号
		ms.replaceAllText("P1_15", joSD.getString("bqdd"));// 不确定度
		ms.replaceAllText("P1_16", joSD.getString("jlbzzsh"));// 计量标准证书号
		ms.replaceAllText("P1_17", DateTimeOperation(joSD.getString("yxqz")));// 有效期至
		ms.replaceAllText("P1_18", joID.getString("jddd"));// 检定地点
		ms.replaceAllText("P1_19", joID.getString("wendu"));// 温度
		ms.replaceAllText("P1_20", joID.getString("shidu"));// 湿度

		ms.replaceAllText("P1_21", joID.getString("wg"));// 外观
		// ms.replaceAllText("P1_22", joID.getString(""));//
		ms.replaceAllText("P1_23", joID.getString("jydz"));// 绝缘电阻
		ms.replaceAllText("P1_24", joID.getString("jyqd"));// 绝缘强度
		// ms.replaceAllText("P1_25", joID.getString(""));//
		// ms.replaceAllText("P1_26", joID.getString(""));//
		// ms.replaceAllText("P1_41", joID.getString("clfw"));// 测量范围
		ms.replaceAllText("P1_30", joID.getString("xsnl"));// 显示能力
		ms.replaceAllText("P1_31", joID.getString("klcldy"));// 开路测量电压
		ms.replaceAllText("P1_32", joID.getString("dldy"));// 跌落（中值）电压
		ms.replaceAllText("P1_33", joID.getString("dndywdx"));// 端钮电压稳定性
		ms.replaceAllText("P1_34", joID.getString("qxyyjy"));// 倾斜影响检验
		ms.replaceAllText("P1_42", UnitChange(jsonArrayFR.getJSONObject(0)
				.getString("dw")));// 全检量程区段单位
		ms.replaceAllText("P1_43", UnitChange(jsonArrayNFR.getJSONObject(0)
				.getString("dw")));// 非全检量程区段单位1
		ms.replaceAllText("P1_44", UnitChange(jsonArrayNFR.getJSONObject(3)
				.getString("dw")));// 非全检量程区段单位2
		ms.replaceAllText("P1_45", UnitChange(jsonArrayNFR.getJSONObject(6)
				.getString("dw")));// 非全检量程区段单位3

		ms.setHeader("P1_1_0", joID.getString("zsbh"));// 替换页眉中的内容，只做一次操作

		// 全检量程区段数据
		try {

			for (int i = 0; i < jsonArrayFR.length(); i++) {

				double standardvalue = jsonArrayFR.getJSONObject(i).getDouble(
						"standardvalue");
				double readvalue = jsonArrayFR.getJSONObject(i).getDouble(
						"readvalue");
				double errorrange = (Math.abs(readvalue - standardvalue))
						/ standardvalue * 100;
				jsonArrayFR.getJSONObject(i).put("errorrange",
						String.format("%.2f", errorrange));
				// System.out.println(String.format("%.2f",standardvalue)+"   "+String.format("%.2f",readvalue)+"   "
				// + String.format("%.2f",errorrange));
			}
			// System.out.println(jsonArray);
			// System.out.println(jsonArray.length());
			int tableIndex = 4;// word中第3张表格
			int rowBegin = 13;// 代表起始行1开始
			int rowEnd = 22;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				if ((i - rowBegin) < jsonArrayFR.length()) {
					ms.putTxtToCell(
							tableIndex,
							i,
							2,
							jsonArrayFR.getJSONObject(i - rowBegin).getString(
									"standardvalue"));
					ms.putTxtToCell(tableIndex, i, 3, jsonArrayFR
							.getJSONObject(i - rowBegin).getString("readvalue"));
					ms.putTxtToCell(tableIndex, i, 4, jsonArrayFR
							.getJSONObject(i - rowBegin)
							.getString("errorrange")
							+ "%");
				} else {
					ms.putTxtToCell(tableIndex, i, 2, "*---");
					ms.putTxtToCell(tableIndex, i, 3, "*---");
					ms.putTxtToCell(tableIndex, i, 4, "*---");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 非全检量程区段数据
		try {

			for (int i = 0; i < jsonArrayNFR.length(); i++) {
				if (jsonArrayNFR.getJSONObject(i).getString("standardvalue")
						.equals("*---")
						|| jsonArrayNFR.getJSONObject(i).getString("readvalue")
								.equals("*---")) {
					jsonArrayNFR.getJSONObject(i).put("errorrange", "*---");
				} else {

					double standardvalue = jsonArrayNFR.getJSONObject(i)
							.getDouble("standardvalue");
					double readvalue = jsonArrayNFR.getJSONObject(i).getDouble(
							"readvalue");
					double errorrange = (Math.abs(readvalue - standardvalue))
							/ standardvalue * 100;
					jsonArrayNFR.getJSONObject(i).put("errorrange",
							String.format("%.2f", errorrange) + "%");
				}

			}

			// 非全检量程区段数据 第一组
			int tableIndex = 4;// word中第3张表格
			int rowBegin = 13;// 代表起始行,从1开始
			int rowEnd = 15;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				ms.putTxtToCell(
						tableIndex,
						i,
						6,
						jsonArrayNFR.getJSONObject(i - rowBegin).getString(
								"standardvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						7,
						jsonArrayNFR.getJSONObject(i - rowBegin).getString(
								"readvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						8,
						jsonArrayNFR.getJSONObject(i - rowBegin).getString(
								"errorrange"));
			}

			// 非全检量程区段数据 第二组
			rowBegin = 18;// 代表起始行,从1开始
			rowEnd = 20;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				ms.putTxtToCell(
						tableIndex,
						i,
						6,
						jsonArrayNFR.getJSONObject(i - rowBegin + 3).getString(
								"standardvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						7,
						jsonArrayNFR.getJSONObject(i - rowBegin + 3).getString(
								"readvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						8,
						jsonArrayNFR.getJSONObject(i - rowBegin + 3).getString(
								"errorrange"));
			}

			// 非全检量程区段数据 第三组
			rowBegin = 23;// 代表起始行,从1开始
			rowEnd = 25;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				ms.putTxtToCell(
						tableIndex,
						i,
						6,
						jsonArrayNFR.getJSONObject(i - rowBegin + 6).getString(
								"standardvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						7,
						jsonArrayNFR.getJSONObject(i - rowBegin + 6).getString(
								"readvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						8,
						jsonArrayNFR.getJSONObject(i - rowBegin + 6).getString(
								"errorrange"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		String fileName = joID.getString("sjdw") + "_绝缘电阻表检定证书_"
				+ joID.getString("zsbh") + ".doc";

		// 判断文件是否存在，存在则删除
		new CopyFile().delFile(certificatesPath + "\\" + fileName);

		// 保存.doc文件
		ms.save(certificatesPath + "\\" + fileName);

		// 关闭全部应用
		ms.close();

//		new CopyFile().openFolder(certificatesPath);// 打开本地指定目录 D:\\电阻表模板和证书\\证书
		
		// 生成一个MSwordManager对象,并且设置显示Word程序// 打开模板文件
		new WordManager(true).openDocument(certificatesPath + "\\" + fileName);
	}

	/**
	 * 4生成 绝缘电阻表原始记录.doc
	 */
	public void createJyOriginFile(String realPath,String result) {
		this.copyFiles(realPath);
		// 生成一个MSwordManager对象,并且设置显示Word程序
		WordManager ms = new WordManager(false);
		// 打开模板文件
		ms.openDocument(modelsPath + "\\" + jyOrigin);

		JSONObject jo = new JSONObject(result);
		String inspectionDevice = jo.getString("inspectionDevice");// 送检仪器
		String standardDevice = jo.getString("standardDevice");// 标准器
		String fullRangeData = jo.getString("fullRangeData");// 全检量程区段
		String notFullRangeData = jo.getString("notFullRangeData");// 非全检量程区段

		JSONArray jsonArrayID = new JSONArray(inspectionDevice);// 送检仪器
		JSONArray jsonArraySD = new JSONArray(standardDevice);// 标准器
		JSONArray jsonArrayFR = new JSONArray(fullRangeData);// 全检量程区段
		JSONArray jsonArrayNFR = new JSONArray(notFullRangeData);// 非全检量程区段

		JSONObject joID = jsonArrayID.getJSONObject(0);// 送检仪器
		JSONObject joSD = jsonArraySD.getJSONObject(0);// 标准器

		// 替换内容， 参数一为要查找的内容，参数二为替换后的新内容
		ms.replaceText("P1_1_0", joID.getString("zsbh"));// 证书编号
		ms.replaceText("P1_2_0", joID.getString("sjdw"));// 送检单位
		ms.replaceText("P1_3_0", joID.getString("yqmc"));// 计量器具名称
		ms.replaceAllText("P1_4_0", joID.getString("xinghao"));// 型号规格
		ms.replaceAllText("P1_5_0", joID.getString("zqddj"));// 准确度等级
		ms.replaceAllText("P1_6_0", joID.getString("sccj"));// 生产厂家
		ms.replaceAllText("P1_7_0", joID.getString("yqbh"));// 出厂编号
		// ms.replaceAllText("P1_8_0", joID.getString(""));//
		ms.replaceAllText("P1_9_0", DateTimeOperation(joID.getString("jdsj")));// 检定日期
		ms.replaceAllText("P1_10", DateTimeOperation(joID.getString("yxqsj")));// 有效日期
		ms.replaceAllText("P1_11", joID.getString("jdyj"));// 检定依据
		ms.replaceAllText("P1_12", joSD.getString("mc"));// 计量标准器具名称
		ms.replaceAllText("P1_13", joSD.getString("xh"));// 型号
		ms.replaceAllText("P1_14", joSD.getString("yqbh"));// 仪器编号
		ms.replaceAllText("P1_15", joSD.getString("bqdd"));// 不确定度
		ms.replaceAllText("P1_16", joSD.getString("jlbzzsh"));// 计量标准证书号
		ms.replaceAllText("P1_17", DateTimeOperation(joSD.getString("yxqz")));// 有效期至
		ms.replaceAllText("P1_18", joID.getString("jddd"));// 检定地点
		ms.replaceAllText("P1_19", joID.getString("wendu"));// 温度
		ms.replaceAllText("P1_20", joID.getString("shidu"));// 湿度

		ms.replaceAllText("P1_21", joID.getString("wg"));// 外观
		// ms.replaceAllText("P1_22", joID.getString(""));//
		ms.replaceAllText("P1_23", joID.getString("jydz"));// 绝缘电阻
		ms.replaceAllText("P1_24", joID.getString("jyqd"));// 绝缘强度
		// ms.replaceAllText("P1_25", joID.getString(""));//
		// ms.replaceAllText("P1_26", joID.getString(""));//
		ms.replaceAllText("P1_41", joID.getString("clfw"));// 测量范围
		ms.replaceAllText("P1_30", joID.getString("xsnl"));// 显示能力
		ms.replaceAllText("P1_31", joID.getString("klcldy"));// 开路测量电压
		ms.replaceAllText("P1_32", joID.getString("dldy"));// 跌落（中值）电压
		ms.replaceAllText("P1_33", joID.getString("dndywdx"));// 端钮电压稳定性
		ms.replaceAllText("P1_34", joID.getString("qxyyjy"));// 倾斜影响检验
		ms.replaceAllText("P1_42", UnitChange(jsonArrayFR.getJSONObject(0)
				.getString("dw")));// 全检量程区段单位
		ms.replaceAllText("P1_43", UnitChange(jsonArrayNFR.getJSONObject(0)
				.getString("dw")));// 非全检量程区段单位1
		ms.replaceAllText("P1_44", UnitChange(jsonArrayNFR.getJSONObject(3)
				.getString("dw")));// 非全检量程区段单位2
		ms.replaceAllText("P1_45", UnitChange(jsonArrayNFR.getJSONObject(6)
				.getString("dw")));// 非全检量程区段单位3

		// ms.setHeader("P1_1", joID.getString("zsbh"));//替换页眉中的内容，只做一次操作

		// 全检量程区段数据
		try {

			for (int i = 0; i < jsonArrayFR.length(); i++) {

				double standardvalue = jsonArrayFR.getJSONObject(i).getDouble(
						"standardvalue");
				double readvalue = jsonArrayFR.getJSONObject(i).getDouble(
						"readvalue");
				double errorrange = (Math.abs(readvalue - standardvalue))
						/ standardvalue * 100;
				jsonArrayFR.getJSONObject(i).put("errorrange",
						String.format("%.2f", errorrange));

				// System.out.println(String.format("%.2f",standardvalue)+"   "+String.format("%.2f",readvalue)+"   "
				// + String.format("%.2f",errorrange));
			}
			// System.out.println(jsonArray);
			// System.out.println(jsonArray.length());
			int tableIndex = 3;// word中第3张表格
			int rowBegin = 13;// 代表起始行1开始
			int rowEnd = 22;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				if ((i - rowBegin) < jsonArrayFR.length()) {
					ms.putTxtToCell(
							tableIndex,
							i,
							2,
							jsonArrayFR.getJSONObject(i - rowBegin).getString(
									"standardvalue"));
					ms.putTxtToCell(tableIndex, i, 3, jsonArrayFR
							.getJSONObject(i - rowBegin).getString("readvalue"));
					ms.putTxtToCell(tableIndex, i, 4, jsonArrayFR
							.getJSONObject(i - rowBegin)
							.getString("errorrange")
							+ "%");
				} else {
					ms.putTxtToCell(tableIndex, i, 2, "*---");
					ms.putTxtToCell(tableIndex, i, 3, "*---");
					ms.putTxtToCell(tableIndex, i, 4, "*---");
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		// 非全检量程区段数据
		try {

			for (int i = 0; i < jsonArrayNFR.length(); i++) {
				if (jsonArrayNFR.getJSONObject(i).getString("standardvalue")
						.equals("*---")
						|| jsonArrayNFR.getJSONObject(i).getString("readvalue")
								.equals("*---")) {
					jsonArrayNFR.getJSONObject(i).put("errorrange", "*---");
				} else {
					double standardvalue = jsonArrayNFR.getJSONObject(i)
							.getDouble("standardvalue");
					double readvalue = jsonArrayNFR.getJSONObject(i).getDouble(
							"readvalue");
					double errorrange = (Math.abs(readvalue - standardvalue))
							/ standardvalue * 100;
					jsonArrayNFR.getJSONObject(i).put("errorrange",
							String.format("%.2f", errorrange) + "%");
				}
			}

			// 非全检量程区段数据 第一组
			int tableIndex = 3;// word中第3张表格
			int rowBegin = 13;// 代表起始行,从1开始
			int rowEnd = 15;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				ms.putTxtToCell(
						tableIndex,
						i,
						6,
						jsonArrayNFR.getJSONObject(i - rowBegin).getString(
								"standardvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						7,
						jsonArrayNFR.getJSONObject(i - rowBegin).getString(
								"readvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						8,
						jsonArrayNFR.getJSONObject(i - rowBegin).getString(
								"errorrange"));

			}

			// 非全检量程区段数据 第二组
			rowBegin = 18;// 代表起始行,从1开始
			rowEnd = 20;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				ms.putTxtToCell(
						tableIndex,
						i,
						6,
						jsonArrayNFR.getJSONObject(i - rowBegin + 3).getString(
								"standardvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						7,
						jsonArrayNFR.getJSONObject(i - rowBegin + 3).getString(
								"readvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						8,
						jsonArrayNFR.getJSONObject(i - rowBegin + 3).getString(
								"errorrange"));
			}

			// 非全检量程区段数据 第三组
			rowBegin = 23;// 代表起始行,从1开始
			rowEnd = 25;// 代表结束行
			// 将数据插入表格
			for (int i = rowBegin; i <= rowEnd; i++) {
				ms.putTxtToCell(
						tableIndex,
						i,
						6,
						jsonArrayNFR.getJSONObject(i - rowBegin + 6).getString(
								"standardvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						7,
						jsonArrayNFR.getJSONObject(i - rowBegin + 6).getString(
								"readvalue"));
				ms.putTxtToCell(
						tableIndex,
						i,
						8,
						jsonArrayNFR.getJSONObject(i - rowBegin + 6).getString(
								"errorrange"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		String fileName = joID.getString("sjdw") + "_绝缘电阻表原始记录_"
				+ joID.getString("zsbh") + ".doc";

		// 判断文件是否存在，存在则删除
		new CopyFile().delFile(certificatesPath + "\\" + fileName);

		// 保存.doc文件
		ms.save(certificatesPath + "\\" + fileName);

		// 关闭全部应用
		ms.close();

//		new CopyFile().openFolder(certificatesPath);// 打开本地指定目录 D:\\电阻表模板和证书\\证书
		
		// 生成一个MSwordManager对象,并且设置显示Word程序// 打开模板文件
		new WordManager(true).openDocument(certificatesPath + "\\" + fileName);
	}

	/**
	 * 截取字符串substring(i,j),i表示开始位置，从0开始，j表示结束位置，但结果不包括j的位置
	 */
	public String DateTimeOperation(String time) {
		return time.substring(0, 4) + "年" + time.substring(5, 7) + "月"
				+ time.substring(8, 10) + "日";
	}

	/**
	 * 截取字符串substring(i,j),i表示开始位置，从0开始，j表示结束位置，但结果不包括j的位置
	 */
	public String UnitChange(String uint) {
		switch (Integer.parseInt(uint)) {
		case 6:
			return "MΩ";
		case 9:
			return "GΩ";
		case 12:
			return "TΩ";
		case 1:
			return "mΩ";
		case 2:
			return "Ω";
		case 3:
			return "kΩ";
		default:
			return null;
		}
	}

	 public static void main(String[] args) {
	
	 WordCreation wordTest = new WordCreation();
	
//	  wordTest.copyFiles();
//	 new CopyFile().openFolder(certificatesPath);// 打开本地指定目录
	
	 // 打开保存好的文档
	 // MSWordManager ms2 = new MSWordManager(true);
	 // ms2.openDocument(certificatesPath + "\\2.doc");
	
	 }

}

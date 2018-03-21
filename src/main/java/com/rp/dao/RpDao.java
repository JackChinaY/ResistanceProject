package com.rp.dao;

import com.rp.model.AssistantData;
import com.rp.model.CaiYangRNRX;
import com.rp.model.InspectionDecLeft;
import com.rp.model.InspectionDevice;
import com.rp.model.PositionEffect;
import com.rp.model.StandardDevice;
import com.rp.model.User;

public class RpDao extends BaseDao {

	/**
	 * 方法序号：1 登录
	 */
	public String login(String username, String password) throws Exception {
		String sql = " SELECT username FROM User WHERE username=? AND password=?";
		return this.getOneRecard(sql, username, password);

	}

	/**
	 * 方法序号：2 注册
	 */
	public boolean register(User user) throws Exception {
		String sql = "INSERT INTO User VALUES (?,?)";
		int result = this.saveEntity(sql, user);
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号：3 送检仪器信息录入
	 */
	public boolean addInspectionDevice(InspectionDevice inspectionDevice)
			throws Exception {
		String sql = "INSERT INTO InspectionDevice (leixing,xinghao,yqmc,yqbh,sjdw,zqddj,clfw,sccj,jddd,wendu,shidu,jdsj,yxqsj,jdyj,zsbh,staDevLX) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
		int result = this.saveEntity(sql, inspectionDevice);
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号：3_1验证证书编号是否存在
	 */
	public long verifyInspectionDeviceZSBH(String id) throws Exception {
		String sql = "SELECT count(*) AS count FROM InspectionDevice WHERE zsbh=?";
		return this.getCount(sql, id);		
	}

	/**
	 * 方法序号： 4 查询所有送检仪器信息 主页
	 * leixing,xinghao,yqmc,yqbh,sjdw,zqddj,clfw,sccj,jddd,wendu,shidu,jdsj,yxqsj,jdyj,zsbh,
	 * staDevXH,wg,jydz,jyqd,xsnl,klcldy,dldy,dndywdx,qxyyjy,jdjl,tdjc,wzyxsy,fzjddzyxsy
	 * @return json数组
	 */
	public String findAllInspectionDevice() throws Exception {
		String sql = " SELECT * FROM InspectionDevice Order by jdsj DESC";
		return this.getForJson(sql);
	}

	/**
	 * 方法序号： 4_0 按某种特定顺序， 查询所有送检仪器信息 主页
	 * 
	 * @return json数组
	 */
	public String findAllInspectionDeviceByOrder(String order) throws Exception {
		String result;
		String sql_leixing = " SELECT * FROM InspectionDevice Order by leixing ASC";
		String sql_xinghao = " SELECT * FROM InspectionDevice Order by xinghao ASC";
		String sql_yqmc = " SELECT * FROM InspectionDevice Order by yqmc ASC";
		String sql_jdsj = " SELECT * FROM InspectionDevice Order by jdsj DESC";
		String sql_sjdw = " SELECT * FROM InspectionDevice Order by sjdw ASC";
		String sql_zsbh = " SELECT * FROM InspectionDevice Order by zsbh ASC";
		if (order.equals("leixing")) {
			result = this.getForJson(sql_leixing);
		} else if (order.equals("xinghao")) {
			result = this.getForJson(sql_xinghao);
		} else if (order.equals("yqmc")) {
			result = this.getForJson(sql_yqmc);
		} else if (order.equals("jdsj")) {
			result = this.getForJson(sql_jdsj);
		} else if (order.equals("sjdw")) {
			result = this.getForJson(sql_sjdw);
		} else if (order.equals("zsbh")) {
			result = this.getForJson(sql_zsbh);
		} else {
			result = "出错！";
		}
		return result;
	}

	/**
	 * 方法序号： 4_1 根据证书编号， 查询单条送检仪器信息 主页
	 * 
	 * @return json数组
	 */
	public String findOneInspectionDevice(String id) throws Exception {
		String sql = " SELECT * FROM InspectionDevice WHERE zsbh=?";
		return this.getForJson(sql, id);
	}

	/**
	 * 方法序号：4_2 删除一条送检仪器信息
	 */
	public boolean deleteInspectionDevice(String string) throws Exception {
		String sql = " DELETE FROM InspectionDevice WHERE zsbh=?";
		int result = this.saveOrUpdateOrDelete(sql, string);
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号：4_3 修改一条送检仪器信息
	 */
	public boolean modifyInspectionDevice(InspectionDevice inspectionDevice)
			throws Exception {
		String sql = "UPDATE InspectionDevice SET leixing=?,xinghao=?,yqmc=?,yqbh=?,sjdw=?,zqddj=?,clfw=?,sccj=?,jddd=?,wendu=?,shidu=?,jdsj=?,yxqsj=?,jdyj=? WHERE zsbh=?";
		int result = this.saveOrUpdateOrDelete(sql,
				inspectionDevice.getLeixing(), inspectionDevice.getXinghao(),
				inspectionDevice.getYqmc(), inspectionDevice.getYqbh(),
				inspectionDevice.getSjdw(), inspectionDevice.getZqddj(),
				inspectionDevice.getClfw(), inspectionDevice.getSccj(),
				inspectionDevice.getJddd(), inspectionDevice.getWendu(),
				inspectionDevice.getShidu(), inspectionDevice.getJdsj(),
				inspectionDevice.getYxqsj(), inspectionDevice.getJdyj(),
				inspectionDevice.getZsbh());
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号：5 标准器信息录入
	 */
	public boolean addStandardDevice(StandardDevice standardDevice)
			throws Exception {
		String sql = "INSERT INTO StandardDevice (xh,mc,yqbh,bqdd,jlbzzsh,yxqz,lx) VALUES (?,?,?,?,?,?,?)";
		int result = this.saveEntity(sql, standardDevice);
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号： 6 查询所有标准器信息 主页
	 * 
	 * @return json数组
	 */
	public String findAllStandardDevice() throws Exception {
		String sql = " SELECT * FROM StandardDevice";
		return this.getForJson(sql);
	}

	/**
	 * 方法序号： 6_0根据型号 查询一条标准器信息
	 * 
	 * @return json数组
	 */
	public String findOneStandardDevice(String id) throws Exception {
		String sql = " SELECT * FROM StandardDevice WHERE lx=?";
		return this.getForJson(sql, id);
	}

	/**
	 * 方法序号：6_1 删除标准器信息
	 */
	public boolean deleteStandardDevice(String string) throws Exception {
		String sql = " DELETE FROM StandardDevice WHERE xh=?";
		int result = this.saveOrUpdateOrDelete(sql, string);
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号：6_2标准器信息 单条修改
	 */
	public boolean modifyStandardDevice(StandardDevice standardDevice)
			throws Exception {
		String sql = "UPDATE StandardDevice SET mc=?,yqbh=?,bqdd=?,jlbzzsh=?,yxqz=? WHERE xh=?";
		int result = this.saveOrUpdateOrDelete(sql,
				standardDevice.getMingchen(), standardDevice.getYqbh(),
				standardDevice.getBqdd(), standardDevice.getJlbzzsh(),
				standardDevice.getYxqz(), standardDevice.getXinghao());
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号： 查询 接地全检量程区段
	 * 
	 * @return json数组
	 */
	public String findJDFullRange(String id) throws Exception {
		String sql = " SELECT * FROM jdFullRange where zsbh= ?";
		return this.getForJson(sql, id);
	}

//	/**
//	 * 方法序号： 7_1 增加送检仪器和标准器（型号）之间的对应关系
//	 */
//	public boolean addRelationship(String zsbh, String xh) throws Exception {
//		String sql = "UPDATE InspectionDevice SET staDevLX=? WHERE zsbh=?";
//		int result = this.saveOrUpdateOrDelete(sql, xh, zsbh);
//		if (result > 0)
//			return true;
//		else
//			return false;
//	}

	/**
	 * 方法序号： 8_0 删除全检量程区段
	 */
	public boolean deleteQJData(String string) throws Exception {
		String sql = "DELETE FROM FullRange WHERE zsbh =?";
		int result = this.saveOrUpdateOrDelete(sql, string);
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号： 8_1 提交全检量程区段
	 */
	public boolean addQJData(CaiYangRNRX caiYangRNRX) throws Exception {
		String sql = "INSERT INTO FullRange (zsbh,standardvalue,readvalue,dw,id) VALUES (?,?,?,?,?)";
		int result = this.saveEntity(sql, caiYangRNRX);
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号： 8_2_0 删除非全检量程区段
	 */
	public boolean deleteFQJData(String string) throws Exception {
		String sql = "DELETE FROM NotFullRange WHERE zsbh = ?";
		int result = this.saveOrUpdateOrDelete(sql, string);
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号： 8_2 提交非全检量程区段
	 */
	public boolean addFQJData(CaiYangRNRX caiYangRNRX) throws Exception {
		String sql = "INSERT INTO NotFullRange (zsbh,standardvalue,readvalue,dw,id) VALUES (?,?,?,?,?)";
		int result = this.saveEntity(sql, caiYangRNRX);
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号： 8_3_0 删除位置影响试验
	 */
	public boolean deletePositionEffectData(String string) throws Exception {
		String sql = "DELETE FROM PositionEffect WHERE zsbh = ?";
		int result = this.saveOrUpdateOrDelete(sql, string);
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号： 8_3 提交Part3 位置影响试验
	 */
	public boolean addPositionEffectData(PositionEffect positionEffect)
			throws Exception {
		String sql = "INSERT INTO PositionEffect (zsbh,lc_value,front_value,back_value,left_value,right_value,dw,id) VALUES (?,?,?,?,?,?,?,?)";
		int result = this.saveEntity(sql, positionEffect);
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号： 8_4_0 删除辅助接地电阻影响试验数据
	 */
	public boolean deleteAssistantData(String string) throws Exception {
		String sql = "DELETE FROM AssistantData WHERE zsbh = ?";
		int result = this.saveOrUpdateOrDelete(sql, string);
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号： 8_4 提交Part4 辅助接地电阻影响试验数据
	 */
	public boolean addAssistantData(AssistantData assistantData)
			throws Exception {
		String sql = "INSERT INTO AssistantData (zsbh,lc,value_0,value_500,value_1000,value_2000,value_5000,dw,id) VALUES (?,?,?,?,?,?,?,?,?)";
		int result = this.saveEntity(sql, assistantData);
		if (result > 0)
			return true;
		else
			return false;
	}
	
	/**
	 * 方法序号： 8_5 提交 开路测量电压and跌落（中值）电压  BB
	 */
	public boolean addKLDL(String zsbh,String kailu,String dieluo)throws Exception {
		String sql = "UPDATE InspectionDevice SET klcldy = ?, dldy = ? WHERE zsbh = ?";
		int result = this.saveOrUpdateOrDelete(sql,kailu,dieluo,zsbh);
		if (result > 0)
			return true;
		else
			return false;
	}
	
	/**
	 * 方法序号：9_1 添加绝缘电阻表剩余部分数据到数据库 11个参数 zsbh;//送检仪器证书编号 wg;//外观 jydz;//绝缘电阻
	 * jyqd;//绝缘强度 xsnl;//显示能力 klcldy;//开路测量电压 dldy;//跌落（中值）电压 dndywdx;//端钮电压稳定性
	 * qxyyjy;//倾斜影响检验 jdjl;//检定结论 tdjc;//通电检查 wzyxsy;//位置影响试验 fzjddzyxsy;//辅助接地电阻影响试验
	 */
	public boolean addInspectionDecLeft(InspectionDecLeft ins) throws Exception {
		String sql = "UPDATE InspectionDevice SET wg = ? , jydz = ?, jyqd = ?, xsnl = ?, klcldy = ?, dldy = ?, dndywdx = ?, qxyyjy = ? , jdjl = ?, tdjc = ? , wzyxsy = ? , fzjddzyxsy = ?  WHERE zsbh = ?";
		int result = this.saveOrUpdateOrDelete(sql, ins.getWg(), ins.getJydz(),
				ins.getJyqd(), ins.getXsnl(), ins.getKlcldy(), ins.getDldy(),
				ins.getDndywdx(), ins.getQxyyjy(), ins.getJdjl(),
				ins.getTdjc(),ins.getWzyxsy(),ins.getFzjddzyxsy(), ins.getZsbh());
		if (result > 0)
			return true;
		else
			return false;
	}

	/**
	 * 方法序号：9_2 根据某一证书编号查询其下所有全检量程区数据每次10条
	 */
	public String findFullRangeDataById(String id) throws Exception {
		String sql = "SELECT * FROM FullRange WHERE zsbh = ? Order by id ASC";
		return this.getForJson(sql, id);
	}

	/**
	 * 方法序号：9_3 根据某一证书编号查询其下所有非全检量程区数据每次9条
	 */
	public String findNotFullRangeDataById(String id) throws Exception {
		String sql = "SELECT * FROM NotFullRange WHERE zsbh = ? Order by id ASC";
		return this.getForJson(sql, id);
	}
	
	/**
	 * 方法序号：9_4 根据某一证书编号查询其下所有位置影响试验数据3条
	 */
	public String findPositionEffectDataById(String id) throws Exception {
		String sql = "SELECT * FROM PositionEffect WHERE zsbh = ? Order by id ASC";
		return this.getForJson(sql, id);
	}

	/**
	 * 方法序号：9_5 根据某一证书编号查询其下所有辅助接地电阻影响试验数据3条
	 */
	public String findAssistantDataById(String id) throws Exception {
		String sql = "SELECT * FROM AssistantData WHERE zsbh = ? Order by id ASC";
		return this.getForJson(sql, id);
	}

}

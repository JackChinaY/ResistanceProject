/**
 * Part5数据验证，找出最大误差
 */
$(function(){
    //AA part1 找出最大误差的一行数据并标红
    $("#part5_4_1_10_2").blur(function () {
        if ($("#part5_4_1_10_2").val() == ""
            || $("#part5_4_1_2_1").val() == "" || $("#part5_4_1_2_2").val() == ""
            || $("#part5_4_1_3_1").val() == "" || $("#part5_4_1_3_2").val() == ""
            || $("#part5_4_1_4_1").val() == "" || $("#part5_4_1_4_2").val() == ""
            || $("#part5_4_1_5_1").val() == "" || $("#part5_4_1_5_2").val() == ""
            || $("#part5_4_1_6_1").val() == "" || $("#part5_4_1_6_2").val() == ""
            || $("#part5_4_1_7_1").val() == "" || $("#part5_4_1_7_2").val() == ""
            || $("#part5_4_1_8_1").val() == "" || $("#part5_4_1_8_2").val() == ""
            || $("#part5_4_1_9_1").val() == "" || $("#part5_4_1_1_2").val() == ""
            || $("#part5_4_1_10_1").val() == "" || $("#part5_4_1_10_2").val() == "") {
            $("#part5_4_11_1").text("表格数据不能有空！");
            $("#part5_4_11_1").css("color", "#FF3030");
        } else {
            $("#part5_4_11_1").text("");
            $("#table5_4_1").find("input[name='qj']").css("background","white");
            var a = new Array(10);
            a[0]=Math.abs($("#part5_4_1_1_1").val() - $("#part5_4_1_1_2").val())/$("#part5_4_1_1_1").val()*100;
            a[1]=Math.abs($("#part5_4_1_2_1").val() - $("#part5_4_1_2_2").val())/$("#part5_4_1_2_1").val()*100;
            a[2]=Math.abs($("#part5_4_1_3_1").val() - $("#part5_4_1_3_2").val())/$("#part5_4_1_3_1").val()*100;
            a[3]=Math.abs($("#part5_4_1_4_1").val() - $("#part5_4_1_4_2").val())/$("#part5_4_1_4_1").val()*100;
            a[4]=Math.abs($("#part5_4_1_5_1").val() - $("#part5_4_1_5_2").val())/$("#part5_4_1_5_1").val()*100;
            a[5]=Math.abs($("#part5_4_1_6_1").val() - $("#part5_4_1_6_2").val())/$("#part5_4_1_6_1").val()*100;
            a[6]=Math.abs($("#part5_4_1_7_1").val() - $("#part5_4_1_7_2").val())/$("#part5_4_1_7_1").val()*100;
            a[7]=Math.abs($("#part5_4_1_8_1").val() - $("#part5_4_1_8_2").val())/$("#part5_4_1_8_1").val()*100;
            a[8]=Math.abs($("#part5_4_1_9_1").val() - $("#part5_4_1_9_2").val())/$("#part5_4_1_9_1").val()*100;
            a[9]=Math.abs($("#part5_4_1_10_1").val() - $("#part5_4_1_10_2").val())/$("#part5_4_1_10_1").val()*100;
            var max=Math.max.apply(null, a);
            var index=-1;
            for(var i=0,len=a.length;i<len;i++){
                if(a[i]==max){
                    index=i;
                    break;
                }
            }
            $("#table5_4_1").find("tr").eq(index).find("input[name='qj']").css("background","red");
        }
    });
    //AA part3 找出最大误差的一行数据并标红
    $("#part5_4_6_10_2").blur(function () {
        if ($("#part5_4_6_10_2").val() == ""
            || $("#part5_4_6_2_1").val() == "" || $("#part5_4_6_2_2").val() == ""
            || $("#part5_4_6_3_1").val() == "" || $("#part5_4_6_3_2").val() == ""
            || $("#part5_4_6_4_1").val() == "" || $("#part5_4_6_4_2").val() == ""
            || $("#part5_4_6_5_1").val() == "" || $("#part5_4_6_5_2").val() == ""
            || $("#part5_4_6_6_1").val() == "" || $("#part5_4_6_6_2").val() == ""
            || $("#part5_4_6_7_1").val() == "" || $("#part5_4_6_7_2").val() == ""
            || $("#part5_4_6_8_1").val() == "" || $("#part5_4_6_8_2").val() == ""
            || $("#part5_4_6_9_1").val() == "" || $("#part5_4_6_1_2").val() == ""
            || $("#part5_4_6_10_1").val() == "" || $("#part5_4_6_10_2").val() == "") {
            $("#part5_4_11_3").text("表格数据不能有空！");
            $("#part5_4_11_3").css("color", "#FF3030");
        } else {
            $("#part5_4_11_3").text("");
            $("#table5_4_3").find("input[name='qj1']").css("background","white");
            var a = new Array(10);
            a[0]=Math.abs($("#part5_4_6_1_1").val() - $("#part5_4_6_1_2").val())/$("#part5_4_6_1_1").val()*100;
            a[1]=Math.abs($("#part5_4_6_2_1").val() - $("#part5_4_6_2_2").val())/$("#part5_4_6_2_1").val()*100;
            a[2]=Math.abs($("#part5_4_6_3_1").val() - $("#part5_4_6_3_2").val())/$("#part5_4_6_3_1").val()*100;
            a[3]=Math.abs($("#part5_4_6_4_1").val() - $("#part5_4_6_4_2").val())/$("#part5_4_6_4_1").val()*100;
            a[4]=Math.abs($("#part5_4_6_5_1").val() - $("#part5_4_6_5_2").val())/$("#part5_4_6_5_1").val()*100;
            a[5]=Math.abs($("#part5_4_6_6_1").val() - $("#part5_4_6_6_2").val())/$("#part5_4_6_6_1").val()*100;
            a[6]=Math.abs($("#part5_4_6_7_1").val() - $("#part5_4_6_7_2").val())/$("#part5_4_6_7_1").val()*100;
            a[7]=Math.abs($("#part5_4_6_8_1").val() - $("#part5_4_6_8_2").val())/$("#part5_4_6_8_1").val()*100;
            a[8]=Math.abs($("#part5_4_6_9_1").val() - $("#part5_4_6_9_2").val())/$("#part5_4_6_9_1").val()*100;
            a[9]=Math.abs($("#part5_4_6_10_1").val() - $("#part5_4_6_10_2").val())/$("#part5_4_6_10_1").val()*100;
            var max=Math.max.apply(null, a);
            var index=-1;
            for(var i=0,len=a.length;i<len;i++){
                if(a[i]==max){
                    index=i;
                    break;
                }
            }
            $("#table5_4_3").find("tr").eq(index).find("input[name='qj1']").css("background","red");
        }
    });
    //刷新页面、关闭页面、关闭浏览器时，都会自动关闭当前端口
    $(window).unbind('beforeunload');//先解绑
    window.onbeforeunload = null;
    $(window).bind('beforeunload',function(){
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_closePort.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                async: false,//同步
                cache: false,
                success: function (data) {
                    if (data.jsonObject == "1") {  //“1”代表关闭成功
                        $("#part5_3").html("该端口关闭成功");
                        $("#part5_2").html("");
                        $("#submit5_1_2").attr('disabled', false);
                        $("#submit5_1_2_0").attr('disabled', true);
                        $("#submit5_1_3").attr('disabled', true);
                    } else {
                        alert("端口关闭失败！");
                    }
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        //return '1';
    });
});
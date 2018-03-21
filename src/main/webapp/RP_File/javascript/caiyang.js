/**
 * 主要是part5部分的操作
 */
$(function () {
    //tab标签切换
    function tabs(tabTit, on, tabCon) {
        $(tabCon).each(function () {
            $(this).children().hide();
            $(this).children().eq(4).show();//0代表第一个 TODO
        });
        //$(tabTit).each(function () {
        //    $(this).children().eq(0).addClass(on);
        //});
        $(tabTit).children().click(function () {
            //$(this).addClass(on).siblings().removeClass(on);
            var index = $(tabTit).children().index(this);
            //$(tabCon).children().eq(index).show().siblings().hide();
            if ($("#leixing5_1").text() == "接地电阻表" && index == 0) {
                alert("菜单选择有误，当前为接地电阻表，应选择CC接地电阻菜单!");
            } else if ($("#leixing5_1").text() == "绝缘电阻表" && index == 2) {
                alert("菜单选择有误，当前为绝缘电阻表，应选择AA绝缘电阻菜单!");
            } else {
                $(this).addClass(on).siblings().removeClass(on);
                $(tabCon).children().eq(index).show().siblings().hide();
            }
        });
    }

    tabs(".choice2", "on", ".context2");

    ////获取数据 采样 全检 part1
    //$("#submit5_4_1_1_1").click(function(){
    //    var int = setInterval(ceshi1,1000);//表示间隔一定时间反复执行某操作
    //    $("#submit5_4_1_1_1").css("display","none");
    //    $("#submit5_4_1_1_2").css("display","block");
    //    $("#submit5_4_1_1_2").click(function(){
    //        clearInterval(int);
    //        $("#submit5_4_1_1_1").val("重新获取");
    //        $("#submit5_4_1_1_1").css("display","block");
    //        $("#submit5_4_1_1_2").css("display","none");
    //    });//清除已设置的setInterval对象
    //});

    /**
     * AA绝缘电阻菜单  Part1 全检量程区段 开始
     */
    //根据标准值算出读数值,参数为字符串
    function readValue(arg) {
        //var temp1 = Math.round(arg*10000).toString();
        //var temp2 = Math.round(parseFloat(temp1.substr(0, 3))/10).toString();
        //for (var i = 1; i <= temp1.length - 6; i++) {
        //    temp2 += "0";
        //}
        //return temp2;
        arg = parseFloat(arg);
        if (arg >= 0.000000001 && arg < 0.00000001) {
            return (Math.round(arg * 1000000000) / 1000000000).toString();
        } else if (arg >= 0.00000001 && arg < 0.0000001) {
            return (Math.round(arg * 100000000) / 100000000).toString();
        } else if (arg >= 0.0000001 && arg < 0.000001) {
            return (Math.round(arg * 10000000) / 10000000).toString();
        } else if (arg >= 0.000001 && arg < 0.00001) {
            return (Math.round(arg * 1000000) / 1000000).toString();
        } else if (arg >= 0.00001 && arg < 0.0001) {
            return (Math.round(arg * 100000) / 100000).toString();
        } else if (arg >= 0.0001 && arg < 0.001) {
            return (Math.round(arg * 10000) / 10000).toString();
        } else if (arg >= 0.001 && arg < 0.01) {
            return (Math.round(arg * 1000) / 1000).toString();
        } else if (arg >= 0.01 && arg < 0.1) {
            return (Math.round(arg * 100) / 100).toString();
        } else if (arg >= 0.1 && arg < 1) {
            return (Math.round(arg * 10) / 10).toString();
        } else if (arg >= 1 && arg < 10) {
            return Math.round(arg).toString();//取整
        } else if (arg >= 10 && arg < 100) {
            return (Math.round(arg / 10) * 10).toString();
        } else if (arg >= 100 && arg < 1000) {
            return (Math.round(arg / 100) * 100).toString();
        } else if (arg >= 1000 && arg < 10000) {
            return (Math.round(arg / 1000) * 1000).toString();
        } else if (arg >= 10000 && arg < 100000) {
            return (Math.round(arg / 10000) * 10000).toString();
        } else if (arg >= 100000 && arg < 1000000) {
            return (Math.round(arg / 100000) * 100000).toString();
        } else if (arg >= 1000000 && arg < 10000000) {
            return (Math.round(arg / 1000000) * 1000000).toString();
        } else if (arg >= 10000000 && arg < 100000000) {
            return (Math.round(arg / 10000000) * 10000000).toString();
        } else if (arg >= 100000000 && arg < 1000000000) {
            return (Math.round(arg / 100000000) * 100000000).toString();
        } else if (arg >= 1000000000 && arg < 10000000000) {
            return (Math.round(arg / 1000000000) * 1000000000).toString();
        } else if (arg >= 10000000000 && arg < 100000000000) {
            return (Math.round(arg / 10000000000) * 10000000000).toString();
        } else {
            return arg;
        }
    }

    var time = 200;//延迟提交到时间ms
    var valuewei = 4;//有效位
    //获取数据 采样 全检 part1 1
    $("#submit5_4_1_1_1").click(function () {
        $("#part5_4_1_1_1").val("");
        $("#submit5_4_1_1_1").val("获取中...");
        setTimeout(caiyangqj1, time);//延迟500ms执行
    });
    //采样 全检 part1  1
    function caiyangqj1() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                //var d=new Date();
                //var t=d.toLocaleTimeString();
                $("#part5_4_1_1_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi).toString());
                //$("#part5_4_1_1_1").attr("title", "两电阻之和：" + (parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi + returnDW());//增加鼠标悬浮在上时显示的内容
                $("#part5_4_1_1_2").val(readValue($("#part5_4_1_1_1").val()));
                $("#submit5_4_1_1_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1  2
    $("#submit5_4_1_2_1").click(function () {
        $("#part5_4_1_2_1").val("");
        $("#submit5_4_1_2_1").val("获取中...");
        setTimeout(caiyangqj2, time);//延迟500ms执行
    });
    //采样 全检 part1 2
    function caiyangqj2() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_1_2_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi).toString());
                $("#part5_4_1_2_2").val(readValue($("#part5_4_1_2_1").val()));
                $("#submit5_4_1_2_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 3
    $("#submit5_4_1_3_1").click(function () {
        $("#part5_4_1_3_1").val("");
        $("#submit5_4_1_3_1").val("获取中...");
        setTimeout(caiyangqj3, time);//延迟500ms执行
    });
    //采样 全检 part1 3
    function caiyangqj3() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_1_3_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi).toString());
                $("#part5_4_1_3_2").val(readValue($("#part5_4_1_3_1").val()));
                $("#submit5_4_1_3_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 4
    $("#submit5_4_1_4_1").click(function () {
        $("#part5_4_1_4_1").val("");
        $("#submit5_4_1_4_1").val("获取中...");
        setTimeout(caiyangqj4, time);//延迟500ms执行
    });
    //采样 全检 part1 4
    function caiyangqj4() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_1_4_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi).toString());
                $("#part5_4_1_4_2").val(readValue($("#part5_4_1_4_1").val()));
                $("#submit5_4_1_4_1").val("获取数据");

            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 5
    $("#submit5_4_1_5_1").click(function () {
        $("#part5_4_1_5_1").val("");
        $("#submit5_4_1_5_1").val("获取中...");
        setTimeout(caiyangqj5, time);//延迟500ms执行
    });
    //采样 全检 part1 5
    function caiyangqj5() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_1_5_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi).toString());
                $("#part5_4_1_5_2").val(readValue($("#part5_4_1_5_1").val()));
                $("#submit5_4_1_5_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 6
    $("#submit5_4_1_6_1").click(function () {
        $("#part5_4_1_6_1").val("");
        $("#submit5_4_1_6_1").val("获取中...");
        setTimeout(caiyangqj6, time);//延迟500ms执行
    });
    //采样 全检 part1 6
    function caiyangqj6() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_1_6_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi).toString());
                $("#part5_4_1_6_2").val(readValue($("#part5_4_1_6_1").val()));
                $("#submit5_4_1_6_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 7
    $("#submit5_4_1_7_1").click(function () {
        $("#part5_4_1_7_1").val("");
        $("#submit5_4_1_7_1").val("获取中...");
        setTimeout(caiyangqj7, time);//延迟500ms执行
    });
    //采样 全检 part1
    function caiyangqj7() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_1_7_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi).toString());
                $("#part5_4_1_7_2").val(readValue($("#part5_4_1_7_1").val()));
                $("#submit5_4_1_7_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 8
    $("#submit5_4_1_8_1").click(function () {
        $("#part5_4_1_8_1").val("");
        $("#submit5_4_1_8_1").val("获取中...");
        setTimeout(caiyangqj8, time);//延迟500ms执行
    });
    //采样 全检 part1 8
    function caiyangqj8() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_1_8_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi).toString());
                $("#part5_4_1_8_2").val(readValue($("#part5_4_1_8_1").val()));
                $("#submit5_4_1_8_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 9
    $("#submit5_4_1_9_1").click(function () {
        $("#part5_4_1_9_1").val("");
        $("#submit5_4_1_9_1").val("获取中...");
        setTimeout(caiyangqj9, time);//延迟500ms执行
    });
    //采样 全检 part1 9
    function caiyangqj9() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_1_9_1").val((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi);
                $("#part5_4_1_9_2").val(readValue($("#part5_4_1_9_1").val()));
                $("#submit5_4_1_9_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 10
    $("#submit5_4_1_10_1").click(function () {
        $("#part5_4_1_10_1").val("");
        $("#submit5_4_1_10_1").val("获取中...");
        setTimeout(caiyangqj10, time);//延迟500ms执行
    });
    //采样 全检 part1 10
    function caiyangqj10() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_1_10_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi).toString());
                $("#part5_4_1_10_2").val(readValue($("#part5_4_1_10_1").val()));
                $("#submit5_4_1_10_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    // 将name=qj的文本框清空，以便重新下一次修改
    $("#submit5_2").click(function () {
        $("input[name='qj']").val(""); // 将name=qj的文本框清空，以便重新下一次修改
        $("input[name='qj']").removeAttr("title");
        $("input[name='qj']").css("background", "white"); // 清除红色标记
        $("#part5_4_11_1").html("");
    });
    // 将name=fq的文本框清空，以便重新下一次修改
    $("#submit5_4").click(function () {
        $("input[name='fq']").val(""); // 将name=fq的文本框清空，以便重新下一次修改
        $("input[name='fq']").removeAttr("title");
        $("#part5_4_11_2").html("");
    });
    // 将name=qj1的文本框清空，以便重新下一次修改
    $("#submit5_11").click(function () {
        $("input[name='qj1']").val(""); // 将name=qj1的文本框清空，以便重新下一次修改
        $("input[name='qj1']").removeAttr("title");
        $("input[name='qj1']").css("background", "white"); // 清除红色标记
        $("#part5_4_11_3").html("");
    });
    // 将name=fq的文本框清空，以便重新下一次修改
    $("#submit5_13").click(function () {
        $("input[name='fq1']").val(""); // 将name=fq1的文本框清空，以便重新下一次修改
        $("input[name='fq1']").removeAttr("title");
        $("#part5_4_11_4").html("");
    });
    // 将name=wz的文本框清空，以便重新下一次修改
    $("#submit5_6").click(function () {
        $("input[name='wz']").val(""); // 将name=fq的文本框清空，以便重新下一次修改
        $("#part5_4_11_5").html("");
    });
    // 将name=fz的文本框清空，以便重新下一次修改
    $("#submit5_8").click(function () {
        $("input[name='fz']").val(""); // 将name=fq的文本框清空，以便重新下一次修改
        $("#part5_4_11_6").html("");
    });

    //提交全检量程区段
    $("#submit5_1").click(function () {
        if ($("#leixing5_1").text() == "" || $("#zsbh5_1").text() == "") {
            alert("请先选择一条待检测的送检仪器！")
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_addQJData.action",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: {
                    "zsbh": $("#zsbh5_1").text(),//送检仪器证书编号
                    "dw": $("input[name='check5_1']:checked").val(),//单位6/9/12--->M/G/T
                    "bzz1": $("#part5_4_1_1_1").val(),//标准值RN
                    "dsz1": $("#part5_4_1_1_2").val(),//读数值RX
                    "bzz2": $("#part5_4_1_2_1").val(),
                    "dsz2": $("#part5_4_1_2_2").val(),
                    "bzz3": $("#part5_4_1_3_1").val(),
                    "dsz3": $("#part5_4_1_3_2").val(),
                    "bzz4": $("#part5_4_1_4_1").val(),
                    "dsz4": $("#part5_4_1_4_2").val(),
                    "bzz5": $("#part5_4_1_5_1").val(),
                    "dsz5": $("#part5_4_1_5_2").val(),
                    "bzz6": $("#part5_4_1_6_1").val(),
                    "dsz6": $("#part5_4_1_6_2").val(),
                    "bzz7": $("#part5_4_1_7_1").val(),
                    "dsz7": $("#part5_4_1_7_2").val(),
                    "bzz8": $("#part5_4_1_8_1").val(),
                    "dsz8": $("#part5_4_1_8_2").val(),
                    "bzz9": $("#part5_4_1_9_1").val(),
                    "dsz9": $("#part5_4_1_9_2").val(),
                    "bzz10": $("#part5_4_1_10_1").val(),
                    "dsz10": $("#part5_4_1_10_2").val()
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data.jsonObject == "1") {
                        $("#part5_4_11_1").html("数据提交成功！")
                    }
                    else {
                        alert("提交失败！")
                    }
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        }
    });

    //用于返回单位，当鼠标悬浮在标准值上时，显示值+单位
    function returnDW() {
        switch ($("input[name='check5_1']:checked").val()) {
            case "6":
                return "MΩ";
                break;
            case "9":
                return "GΩ";
                break;
            case "12":
                return "TΩ";
                break;
            default:
                return null;
                break;
        }
    }

    //处理单位之间的转换问题
    var danwei = 6;//M默认为6，兆欧
    var danweijinzhi = 1;//M默认为1，兆欧,用于后台传过来的值与之相乘
    // 单位为MΩ时,6
    $("#radio5_1").click(function () {
        if (danwei == 9) {
            var jinzhi = 1000;//9->6
            jinzhizhuanhuan(jinzhi)
        } else if (danwei == 12) {
            var jinzhi = 1000000;//12->6
            jinzhizhuanhuan(jinzhi)
        }
        danwei = 6;
        danweijinzhi = 1;
    });

    //单位为GΩ时,9
    $("#radio5_2").click(function () {
        if (danwei == 6) {
            var jinzhi = 0.001;//6->9
            jinzhizhuanhuan(jinzhi)
        } else if (danwei == 12) {
            var jinzhi = 1000;//12->9
            jinzhizhuanhuan(jinzhi)
        }
        danwei = 9;
        danweijinzhi = 0.001;
    });

    //单位为TΩ时,12
    $("#radio5_3").click(function () {
        if (danwei == 6) {
            var jinzhi = 0.000001;//6->12
            jinzhizhuanhuan(jinzhi)
        } else if (danwei == 9) {
            var jinzhi = 0.001;//9->12
            jinzhizhuanhuan(jinzhi)
        }
        danwei = 12;
        danweijinzhi = 0.000001;
    });
    //进制转换公共程序
    function jinzhizhuanhuan(jinzhi) {
        if ($("#part5_4_1_1_1").val() != "") {
            $("#part5_4_1_1_1").val(parseFloat($("#part5_4_1_1_1").val()) * jinzhi);
            //$("#part5_4_1_1_1").attr("title", "两电阻之和：" + $("#part5_4_1_1_1").val() + returnDW())
        }
        //标准值RN
        if ($("#part5_4_1_1_2").val() != "") {
            $("#part5_4_1_1_2").val((parseFloat($("#part5_4_1_1_2").val()) * jinzhi).toString());
        }
        //读数值RX
        if ($("#part5_4_1_2_1").val() != "") {
            $("#part5_4_1_2_1").val((parseFloat($("#part5_4_1_2_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_2_2").val() != "") {
            $("#part5_4_1_2_2").val((parseFloat($("#part5_4_1_2_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_3_1").val() != "") {
            $("#part5_4_1_3_1").val((parseFloat($("#part5_4_1_3_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_3_2").val() != "") {
            $("#part5_4_1_3_2").val((parseFloat($("#part5_4_1_3_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_4_1").val() != "") {
            $("#part5_4_1_4_1").val((parseFloat($("#part5_4_1_4_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_4_2").val() != "") {
            $("#part5_4_1_4_2").val((parseFloat($("#part5_4_1_4_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_5_1").val() != "") {
            $("#part5_4_1_5_1").val((parseFloat($("#part5_4_1_5_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_5_2").val() != "") {
            $("#part5_4_1_5_2").val((parseFloat($("#part5_4_1_5_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_6_1").val() != "") {
            $("#part5_4_1_6_1").val((parseFloat($("#part5_4_1_6_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_6_2").val() != "") {
            $("#part5_4_1_6_2").val((parseFloat($("#part5_4_1_6_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_7_1").val() != "") {
            $("#part5_4_1_7_1").val((parseFloat($("#part5_4_1_7_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_7_2").val() != "") {
            $("#part5_4_1_7_2").val((parseFloat($("#part5_4_1_7_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_8_1").val() != "") {
            $("#part5_4_1_8_1").val((parseFloat($("#part5_4_1_8_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_8_2").val() != "") {
            $("#part5_4_1_8_2").val((parseFloat($("#part5_4_1_8_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_9_1").val() != "") {
            $("#part5_4_1_9_1").val((parseFloat($("#part5_4_1_9_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_9_2").val() != "") {
            $("#part5_4_1_9_2").val((parseFloat($("#part5_4_1_9_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_10_1").val() != "") {
            $("#part5_4_1_10_1").val((parseFloat($("#part5_4_1_10_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_1_10_2").val() != "") {
            $("#part5_4_1_10_2").val((parseFloat($("#part5_4_1_10_2").val()) * jinzhi).toString());
        }
    }

    /**
     * AA绝缘电阻菜单 Part1 全检量程区段 结束
     */


    /**
     * AA绝缘电阻菜单 Part2 非全检量程区段 开始
     */
    var time2 = 200;//延迟提交到时间ms
    var valuewei2 = 4;
    //获取数据 采样 非全检 part2 1
    $("#submit5_4_2_1_1").click(function () {
        $("#part5_4_2_1_1").val("");
        $("#submit5_4_2_1_1").val("获取中...");
        setTimeout(caiyangqj12, time2);//延迟500ms执行
    });
    //采样 非全检 part2  1
    function caiyangqj12() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_2_1_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi2).toString());
                $("#part5_4_2_1_2").val(readValue($("#part5_4_2_1_1").val()));
                $("#submit5_4_2_1_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2  2
    $("#submit5_4_2_2_1").click(function () {
        $("#part5_4_2_2_1").val("");
        $("#submit5_4_2_2_1").val("获取中...");
        setTimeout(caiyangqj22, time2);//延迟500ms执行
    });
    //采样 非全检 part2 2
    function caiyangqj22() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_2_2_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi2).toString());
                $("#part5_4_2_2_2").val(readValue($("#part5_4_2_2_1").val()));
                $("#submit5_4_2_2_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2 3
    $("#submit5_4_2_3_1").click(function () {
        $("#part5_4_2_3_1").val("");
        $("#submit5_4_2_3_1").val("获取中...");
        setTimeout(caiyangqj32, time2);//延迟500ms执行
    });
    //采样 非全检 part2 3
    function caiyangqj32() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_2_3_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi2).toString());
                $("#part5_4_2_3_2").val(readValue($("#part5_4_2_3_1").val()));
                $("#submit5_4_2_3_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2 4  第二组
    $("#submit5_4_2_4_1").click(function () {
        $("#part5_4_2_4_1").val("");
        $("#submit5_4_2_4_1").val("获取中...");
        setTimeout(caiyangqj42, time2);//延迟500ms执行
    });
    //采样 非全检 part2 4
    function caiyangqj42() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_2_4_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi2_2).toString());
                $("#part5_4_2_4_2").val(readValue($("#part5_4_2_4_1").val()));
                $("#submit5_4_2_4_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2 5
    $("#submit5_4_2_5_1").click(function () {
        $("#part5_4_2_5_1").val("");
        $("#submit5_4_2_5_1").val("获取中...");
        setTimeout(caiyangqj52, time2);//延迟500ms执行
    });
    //采样 非全检 part2 5
    function caiyangqj52() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_2_5_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi2_2).toString());
                $("#part5_4_2_5_2").val(readValue($("#part5_4_2_5_1").val()));
                $("#submit5_4_2_5_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2 6
    $("#submit5_4_2_6_1").click(function () {
        $("#part5_4_2_6_1").val("");
        $("#submit5_4_2_6_1").val("获取中...");
        setTimeout(caiyangqj62, time2);//延迟500ms执行
    });
    //采样 非全检 part2 6
    function caiyangqj62() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_2_6_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi2_2).toString());
                $("#part5_4_2_6_2").val(readValue($("#part5_4_2_6_1").val()));
                $("#submit5_4_2_6_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2 7
    $("#submit5_4_2_7_1").click(function () {
        $("#part5_4_2_7_1").val("");
        $("#submit5_4_2_7_1").val("获取中...");
        setTimeout(caiyangqj72, time2);//延迟500ms执行
    });
    //采样 非全检 part2 7
    function caiyangqj72() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_2_7_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi2_3).toString());
                $("#part5_4_2_7_2").val(readValue($("#part5_4_2_7_1").val()));
                $("#submit5_4_2_7_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2 8
    $("#submit5_4_2_8_1").click(function () {
        $("#part5_4_2_8_1").val("");
        $("#submit5_4_2_8_1").val("获取中...");
        setTimeout(caiyangqj82, time2);//延迟500ms执行
    });
    //采样 非全检 part2 8
    function caiyangqj82() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_2_8_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi2_3).toString());
                $("#part5_4_2_8_2").val(readValue($("#part5_4_2_8_1").val()));
                $("#submit5_4_2_8_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2 9
    $("#submit5_4_2_9_1").click(function () {
        $("#part5_4_2_9_1").val("");
        $("#submit5_4_2_9_1").val("获取中...");
        setTimeout(caiyangqj92, time2);//延迟500ms执行
    });
    //采样 非全检 part2 9
    function caiyangqj92() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_2_9_1").val(((parseFloat(data.average1) + parseFloat(data.average2)) * danweijinzhi2_3).toString());
                $("#part5_4_2_9_2").val(readValue($("#part5_4_2_9_1").val()));
                $("#submit5_4_2_9_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //提交非全检量程区段
    $("#submit5_3").click(function () {
        if ($("#leixing5_1").text() == "" || $("#zsbh5_1").text() == "") {
            alert("请先选择一条待检测的送检仪器！")
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_addFQJData.action",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: {
                    "zsbh": $("#zsbh5_1").text(),//送检仪器证书编号
                    "dw1": $("input[name='check5_2']:checked").val(),//单位6/9/12--->M/G/T
                    "dw2": $("input[name='check5_2_2']:checked").val(),//单位6/9/12--->M/G/T
                    "dw3": $("input[name='check5_2_3']:checked").val(),//单位6/9/12--->M/G/T
                    "bzz1": $("#part5_4_2_1_1").val(),//标准值RN
                    "dsz1": $("#part5_4_2_1_2").val(),//读数值RX
                    "bzz2": $("#part5_4_2_2_1").val(),
                    "dsz2": $("#part5_4_2_2_2").val(),
                    "bzz3": $("#part5_4_2_3_1").val(),
                    "dsz3": $("#part5_4_2_3_2").val(),
                    "bzz4": $("#part5_4_2_4_1").val(),
                    "dsz4": $("#part5_4_2_4_2").val(),
                    "bzz5": $("#part5_4_2_5_1").val(),
                    "dsz5": $("#part5_4_2_5_2").val(),
                    "bzz6": $("#part5_4_2_6_1").val(),
                    "dsz6": $("#part5_4_2_6_2").val(),
                    "bzz7": $("#part5_4_2_7_1").val(),
                    "dsz7": $("#part5_4_2_7_2").val(),
                    "bzz8": $("#part5_4_2_8_1").val(),
                    "dsz8": $("#part5_4_2_8_2").val(),
                    "bzz9": $("#part5_4_2_9_1").val(),
                    "dsz9": $("#part5_4_2_9_2").val()
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data.jsonObject == "1") {
                        $("#part5_4_11_2").html("数据提交成功！")
                    }
                    else {
                        alert("提交失败！")
                    }
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        }
    });

    //用于返回单位，当鼠标悬浮在标准值上时，显示值+单位  第一组
    function returnDW2() {
        switch ($("input[name='check5_2']:checked").val()) {
            case "6":
                return "MΩ";
                break;
            case "9":
                return "GΩ";
                break;
            case "12":
                return "TΩ";
                break;
            default:
                return null;
                break;
        }
    }

    //处理单位之间的转换问题
    var danwei2 = 6;//M默认为6，兆欧
    var danweijinzhi2 = 1;//M默认为1，兆欧,用于后台传过来的值与之相乘
    // 单位为MΩ时,6
    $("#radio5_4").click(function () {
        if (danwei2 == 9) {
            var jinzhi = 1000;//9->6
            jinzhizhuanhuan2(jinzhi)
        } else if (danwei2 == 12) {
            var jinzhi = 1000000;//12->6
            jinzhizhuanhuan2(jinzhi)
        }
        danwei2 = 6;
        danweijinzhi2 = 1;
    });

    //单位为GΩ时,9
    $("#radio5_5").click(function () {
        if (danwei2 == 6) {
            var jinzhi = 0.001;//6->9
            jinzhizhuanhuan2(jinzhi)
        } else if (danwei2 == 12) {
            var jinzhi = 1000;//12->9
            jinzhizhuanhuan2(jinzhi)
        }
        danwei2 = 9;
        danweijinzhi2 = 0.001;
    });

    //单位为TΩ时,12
    $("#radio5_6").click(function () {
        if (danwei2 == 6) {
            var jinzhi = 0.000001;//6->12
            jinzhizhuanhuan2(jinzhi)
        } else if (danwei2 == 9) {
            var jinzhi = 0.001;//9->12
            jinzhizhuanhuan2(jinzhi)
        }
        danwei2 = 12;
        danweijinzhi2 = 0.000001;
    });
    //进制转换公共程序
    function jinzhizhuanhuan2(jinzhi) {
        if ($("#part5_4_2_1_1").val() != "") {
            $("#part5_4_2_1_1").val((parseFloat($("#part5_4_2_1_1").val()) * jinzhi).toString());
        }
        //标准值RN
        if ($("#part5_4_2_1_2").val() != "") {
            $("#part5_4_2_1_2").val((parseFloat($("#part5_4_2_1_2").val()) * jinzhi).toString());
        }
        //读数值RX
        if ($("#part5_4_2_2_1").val() != "") {
            $("#part5_4_2_2_1").val((parseFloat($("#part5_4_2_2_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_2_2_2").val() != "") {
            $("#part5_4_2_2_2").val((parseFloat($("#part5_4_2_2_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_2_3_1").val() != "") {
            $("#part5_4_2_3_1").val((parseFloat($("#part5_4_2_3_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_2_3_2").val() != "") {
            $("#part5_4_2_3_2").val((parseFloat($("#part5_4_2_3_2").val()) * jinzhi).toString());
        }
    }

    //处理单位之间的转换问题 第二组
    //用于返回单位，当鼠标悬浮在标准值上时，显示值+单位
    function returnDW2_2() {
        switch ($("input[name='check5_2_2']:checked").val()) {
            case "6":
                return "MΩ";
                break;
            case "9":
                return "GΩ";
                break;
            case "12":
                return "TΩ";
                break;
            default:
                return null;
                break;
        }
    }

    var danwei2_2 = 6;//M默认为6，兆欧
    var danweijinzhi2_2 = 1;//M默认为1，兆欧,用于后台传过来的值与之相乘
    // 单位为MΩ时,6
    $("#radio5_4_2").click(function () {
        if (danwei2_2 == 9) {
            var jinzhi = 1000;//9->6
            jinzhizhuanhuan2_2(jinzhi)
        } else if (danwei2_2 == 12) {
            var jinzhi = 1000000;//12->6
            jinzhizhuanhuan2_2(jinzhi)
        }
        danwei2_2 = 6;
        danweijinzhi2_2 = 1;
    });

    //单位为GΩ时,9
    $("#radio5_5_2").click(function () {
        if (danwei2_2 == 6) {
            var jinzhi = 0.001;//6->9
            jinzhizhuanhuan2_2(jinzhi)
        } else if (danwei2_2 == 12) {
            var jinzhi = 1000;//12->9
            jinzhizhuanhuan2_2(jinzhi)
        }
        danwei2_2 = 9;
        danweijinzhi2_2 = 0.001;
    });

    //单位为TΩ时,12
    $("#radio5_6_2").click(function () {
        if (danwei2_2 == 6) {
            var jinzhi = 0.000001;//6->12
            jinzhizhuanhuan2_2(jinzhi)
        } else if (danwei2_2 == 9) {
            var jinzhi = 0.001;//9->12
            jinzhizhuanhuan2_2(jinzhi)
        }
        danwei2_2 = 12;
        danweijinzhi2_2 = 0.000001;
    });
    //进制转换公共程序
    function jinzhizhuanhuan2_2(jinzhi) {
        if ($("#part5_4_2_4_1").val() != "") {
            $("#part5_4_2_4_1").val((parseFloat($("#part5_4_2_4_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_2_4_2").val() != "") {
            $("#part5_4_2_4_2").val((parseFloat($("#part5_4_2_4_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_2_5_1").val() != "") {
            $("#part5_4_2_5_1").val((parseFloat($("#part5_4_2_5_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_2_5_2").val() != "") {
            $("#part5_4_2_5_2").val((parseFloat($("#part5_4_2_5_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_2_6_1").val() != "") {
            $("#part5_4_2_6_1").val((parseFloat($("#part5_4_2_6_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_2_6_2").val() != "") {
            $("#part5_4_2_6_2").val((parseFloat($("#part5_4_2_6_2").val()) * jinzhi).toString());
        }
    }

    //用于返回单位，当鼠标悬浮在标准值上时，显示值+单位  第三组
    function returnDW2_3() {
        switch ($("input[name='check5_2_3']:checked").val()) {
            case "6":
                return "MΩ";
                break;
            case "9":
                return "GΩ";
                break;
            case "12":
                return "TΩ";
                break;
            default:
                return null;
                break;
        }
    }

    //处理单位之间的转换问题 第三组
    var danwei2_3 = 6;//M默认为6，兆欧
    var danweijinzhi2_3 = 1;//M默认为1，兆欧,用于后台传过来的值与之相乘
    // 单位为MΩ时,6
    $("#radio5_4_3").click(function () {
        if (danwei2_3 == 9) {
            var jinzhi = 1000;//9->6
            jinzhizhuanhuan2_3(jinzhi)
        } else if (danwei2_3 == 12) {
            var jinzhi = 1000000;//12->6
            jinzhizhuanhuan2_3(jinzhi)
        }
        danwei2_3 = 6;
        danweijinzhi2_3 = 1;
    });

    //单位为GΩ时,9
    $("#radio5_5_3").click(function () {
        if (danwei2_3 == 6) {
            var jinzhi = 0.001;//6->9
            jinzhizhuanhuan2_3(jinzhi)
        } else if (danwei2_3 == 12) {
            var jinzhi = 1000;//12->9
            jinzhizhuanhuan2_3(jinzhi)
        }
        danwei2_3 = 9;
        danweijinzhi2_3 = 0.001;
    });

    //单位为TΩ时,12
    $("#radio5_6_3").click(function () {
        if (danwei2_3 == 6) {
            var jinzhi = 0.000001;//6->12
            jinzhizhuanhuan2_3(jinzhi)
        } else if (danwei2_3 == 9) {
            var jinzhi = 0.001;//9->12
            jinzhizhuanhuan2_3(jinzhi)
        }
        danwei2_3 = 12;
        danweijinzhi2_3 = 0.000001;
    });
    //进制转换公共程序
    function jinzhizhuanhuan2_3(jinzhi) {
        if ($("#part5_4_2_7_1").val() != "") {
            $("#part5_4_2_7_1").val((parseFloat($("#part5_4_2_7_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_2_7_2").val() != "") {
            $("#part5_4_2_7_2").val((parseFloat($("#part5_4_2_7_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_2_8_1").val() != "") {
            $("#part5_4_2_8_1").val((parseFloat($("#part5_4_2_8_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_2_8_2").val() != "") {
            $("#part5_4_2_8_2").val((parseFloat($("#part5_4_2_8_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_2_9_1").val() != "") {
            $("#part5_4_2_9_1").val((parseFloat($("#part5_4_2_9_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_2_9_2").val() != "") {
            $("#part5_4_2_9_2").val((parseFloat($("#part5_4_2_9_2").val()) * jinzhi).toString());
        }
    }

    /**
     * AA绝缘电阻菜单 Part2 非全检量程区段 结束
     */


    /**
     * CC接地电阻菜单 Part1 全检量程区段 开始
     */
    var time3 = 200;//延迟提交到时间ms
    var valuewei3 = 4;
    //获取数据 采样 全检 part1 1
    $("#submit5_4_6_1_1").click(function () {
        $("#part5_4_6_1_1").val("");
        $("#submit5_4_6_1_1").val("获取中...");
        setTimeout(caiyangqj13, time3);//延迟500ms执行
    });
    //采样 全检 part1  1
    function caiyangqj13() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_6_1_1").val(((parseFloat(data.average2)) * danweijinzhi3).toString());
                $("#part5_4_6_1_2").val(readValue($("#part5_4_6_1_1").val()));
                $("#submit5_4_6_1_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1  2
    $("#submit5_4_6_2_1").click(function () {
        $("#part5_4_6_2_1").val("");
        $("#submit5_4_6_2_1").val("获取中...");
        setTimeout(caiyangqj23, time3);//延迟500ms执行
    });
    //采样 全检 part1 2
    function caiyangqj23() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_6_2_1").val(((parseFloat(data.average2)) * danweijinzhi3).toString());
                $("#part5_4_6_2_2").val(readValue($("#part5_4_6_2_1").val()));
                $("#submit5_4_6_2_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 3
    $("#submit5_4_6_3_1").click(function () {
        $("#part5_4_6_3_1").val("");
        $("#submit5_4_6_3_1").val("获取中...");
        setTimeout(caiyangqj33, time3);//延迟500ms执行
    });
    //采样 全检 part1 3
    function caiyangqj33() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_6_3_1").val(((parseFloat(data.average2)) * danweijinzhi3).toString());
                $("#part5_4_6_3_2").val(readValue($("#part5_4_6_3_1").val()));
                $("#submit5_4_6_3_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 4
    $("#submit5_4_6_4_1").click(function () {
        $("#part5_4_6_4_1").val("");
        $("#submit5_4_6_4_1").val("获取中...");
        setTimeout(caiyangqj43, time3);//延迟500ms执行
    });
    //采样 全检 part1 4
    function caiyangqj43() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_6_4_1").val(((parseFloat(data.average2)) * danweijinzhi3).toString());
                $("#part5_4_6_4_2").val(readValue($("#part5_4_6_4_1").val()));
                $("#submit5_4_6_4_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 5
    $("#submit5_4_6_5_1").click(function () {
        $("#part5_4_6_5_1").val("");
        $("#submit5_4_6_5_1").val("获取中...");
        setTimeout(caiyangqj53, time3);//延迟500ms执行
    });
    //采样 全检 part1 5
    function caiyangqj53() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_6_5_1").val(((parseFloat(data.average2)) * danweijinzhi3).toString());
                $("#part5_4_6_5_2").val(readValue($("#part5_4_6_5_1").val()));
                $("#submit5_4_6_5_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 6
    $("#submit5_4_6_6_1").click(function () {
        $("#part5_4_6_6_1").val("");
        $("#submit5_4_6_6_1").val("获取中...");
        setTimeout(caiyangqj63, time3);//延迟500ms执行
    });
    //采样 全检 part1 6
    function caiyangqj63() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_6_6_1").val(((parseFloat(data.average2)) * danweijinzhi3).toString());
                $("#part5_4_6_6_2").val(readValue($("#part5_4_6_6_1").val()));
                $("#submit5_4_6_6_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 7
    $("#submit5_4_6_7_1").click(function () {
        $("#part5_4_6_7_1").val("");
        $("#submit5_4_6_7_1").val("获取中...");
        setTimeout(caiyangqj73, time3);//延迟500ms执行
    });
    //采样 全检 part1
    function caiyangqj73() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_6_7_1").val(((parseFloat(data.average2)) * danweijinzhi3).toString());
                $("#part5_4_6_7_2").val(readValue($("#part5_4_6_7_1").val()));
                $("#submit5_4_6_7_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 8
    $("#submit5_4_6_8_1").click(function () {
        $("#part5_4_6_8_1").val("");
        $("#submit5_4_6_8_1").val("获取中...");
        setTimeout(caiyangqj83, time3);//延迟500ms执行
    });
    //采样 全检 part1 8
    function caiyangqj83() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_6_8_1").val(((parseFloat(data.average2)) * danweijinzhi3).toString());
                $("#part5_4_6_8_2").val(readValue($("#part5_4_6_8_1").val()));
                $("#submit5_4_6_8_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 9
    $("#submit5_4_6_9_1").click(function () {
        $("#part5_4_6_9_1").val("");
        $("#submit5_4_6_9_1").val("获取中...");
        setTimeout(caiyangqj93, time3);//延迟500ms执行
    });
    //采样 全检 part1 9
    function caiyangqj93() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_6_9_1").val((parseFloat(data.average2) * danweijinzhi3).toString());
                $("#part5_4_6_9_2").val(readValue($("#part5_4_6_9_1").val()));
                $("#submit5_4_6_9_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 全检 part1 10
    $("#submit5_4_6_10_1").click(function () {
        $("#part5_4_6_10_1").val("");
        $("#submit5_4_6_10_1").val("获取中...");
        setTimeout(caiyangqj103, time3);//延迟500ms执行
    });
    //采样 全检 part1 10
    function caiyangqj103() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_6_10_1").val((parseFloat(data.average2) * danweijinzhi3).toString());
                $("#part5_4_6_10_2").val(readValue($("#part5_4_6_10_1").val()));
                $("#submit5_4_6_10_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //提交全检量程区段
    $("#submit5_10").click(function () {
        if ($("#leixing5_1").text() == "" || $("#zsbh5_1").text() == "") {
            alert("请先选择一条待检测的送检仪器！")
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_addQJData.action",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: {
                    "zsbh": $("#zsbh5_1").text(),//送检仪器证书编号
                    "dw": $("input[name='check5_3']:checked").val(),//单位6/9/12--->M/G/T
                    "bzz1": $("#part5_4_6_1_1").val(),//标准值RN
                    "dsz1": $("#part5_4_6_1_2").val(),//读数值RX
                    "bzz2": $("#part5_4_6_2_1").val(),
                    "dsz2": $("#part5_4_6_2_2").val(),
                    "bzz3": $("#part5_4_6_3_1").val(),
                    "dsz3": $("#part5_4_6_3_2").val(),
                    "bzz4": $("#part5_4_6_4_1").val(),
                    "dsz4": $("#part5_4_6_4_2").val(),
                    "bzz5": $("#part5_4_6_5_1").val(),
                    "dsz5": $("#part5_4_6_5_2").val(),
                    "bzz6": $("#part5_4_6_6_1").val(),
                    "dsz6": $("#part5_4_6_6_2").val(),
                    "bzz7": $("#part5_4_6_7_1").val(),
                    "dsz7": $("#part5_4_6_7_2").val(),
                    "bzz8": $("#part5_4_6_8_1").val(),
                    "dsz8": $("#part5_4_6_8_2").val(),
                    "bzz9": $("#part5_4_6_9_1").val(),
                    "dsz9": $("#part5_4_6_9_2").val(),
                    "bzz10": $("#part5_4_6_10_1").val(),
                    "dsz10": $("#part5_4_6_10_2").val()
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data.jsonObject == "1") {
                        $("#part5_4_11_3").html("数据提交成功！")
                    }
                    else {
                        alert("提交失败！")
                    }
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        }
    });

    //用于返回单位，当鼠标悬浮在标准值上时，显示值+单位
    function returnDW3() {
        switch ($("input[name='check5_3']:checked").val()) {
            case "1":
                return "mΩ";
                break;
            case "2":
                return "Ω";
                break;
            case "3":
                return "KΩ";
                break;
            default:
                return null;
                break;
        }
    }

    //处理单位之间的转换问题
    var danwei3 = 2;//默认为2，欧
    var danweijinzhi3 = 1;//默认为2，欧,用于后台传过来的值与之相乘
    // 单位为mΩ时,1
    $("#radio5_7").click(function () {
        if (danwei3 == 2) {
            var jinzhi = 1000;
            jinzhizhuanhuan3(jinzhi)
        } else if (danwei3 == 3) {
            var jinzhi = 1000000;
            jinzhizhuanhuan3(jinzhi)
        }
        danwei3 = 1;
        danweijinzhi3 = 1000;
    });

    //单位为Ω时,2
    $("#radio5_8").click(function () {
        if (danwei3 == 1) {
            var jinzhi = 0.001;
            jinzhizhuanhuan3(jinzhi)
        } else if (danwei3 == 3) {
            var jinzhi = 1000;
            jinzhizhuanhuan3(jinzhi)
        }
        danwei3 = 2;
        danweijinzhi3 = 1;
    });

    //单位为KΩ时,3
    $("#radio5_9").click(function () {
        if (danwei3 == 1) {
            var jinzhi = 0.000001;
            jinzhizhuanhuan3(jinzhi)
        } else if (danwei3 == 2) {
            var jinzhi = 0.001;
            jinzhizhuanhuan3(jinzhi)
        }
        danwei3 = 3;
        danweijinzhi3 = 0.001;
    });
    //进制转换公共程序
    function jinzhizhuanhuan3(jinzhi) {
        if ($("#part5_4_6_1_1").val() != "") {
            $("#part5_4_6_1_1").val((parseFloat($("#part5_4_6_1_1").val()) * jinzhi).toString());
        }
        //标准值RN
        if ($("#part5_4_6_1_2").val() != "") {
            $("#part5_4_6_1_2").val((parseFloat($("#part5_4_6_1_2").val()) * jinzhi).toString());
        }
        //读数值RX
        if ($("#part5_4_6_2_1").val() != "") {
            $("#part5_4_6_2_1").val((parseFloat($("#part5_4_6_2_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_2_2").val() != "") {
            $("#part5_4_6_2_2").val((parseFloat($("#part5_4_6_2_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_3_1").val() != "") {
            $("#part5_4_6_3_1").val((parseFloat($("#part5_4_6_3_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_3_2").val() != "") {
            $("#part5_4_6_3_2").val((parseFloat($("#part5_4_6_3_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_4_1").val() != "") {
            $("#part5_4_6_4_1").val((parseFloat($("#part5_4_6_4_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_4_2").val() != "") {
            $("#part5_4_6_4_2").val((parseFloat($("#part5_4_6_4_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_5_1").val() != "") {
            $("#part5_4_6_5_1").val((parseFloat($("#part5_4_6_5_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_5_2").val() != "") {
            $("#part5_4_6_5_2").val((parseFloat($("#part5_4_6_5_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_6_1").val() != "") {
            $("#part5_4_6_6_1").val((parseFloat($("#part5_4_6_6_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_6_2").val() != "") {
            $("#part5_4_6_6_2").val((parseFloat($("#part5_4_6_6_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_7_1").val() != "") {
            $("#part5_4_6_7_1").val((parseFloat($("#part5_4_6_7_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_7_2").val() != "") {
            $("#part5_4_6_7_2").val((parseFloat($("#part5_4_6_7_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_8_1").val() != "") {
            $("#part5_4_6_8_1").val((parseFloat($("#part5_4_6_8_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_8_2").val() != "") {
            $("#part5_4_6_8_2").val((parseFloat($("#part5_4_6_8_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_9_1").val() != "") {
            $("#part5_4_6_9_1").val((parseFloat($("#part5_4_6_9_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_9_2").val() != "") {
            $("#part5_4_6_9_2").val((parseFloat($("#part5_4_6_9_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_10_1").val() != "") {
            $("#part5_4_6_10_1").val((parseFloat($("#part5_4_6_10_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_6_10_2").val() != "") {
            $("#part5_4_6_10_2").val((parseFloat($("#part5_4_6_10_2").val()) * jinzhi).toString());
        }
    }

    //增加回路电阻
    $("#submit5_4_6_11_1").click(function () {
        if ($("#part5_4_6_11_1").val() == "") {
            alert("回路电阻为空，请输入有效数值！");
        } else {
            var jinzhi_huilu;
            if (danwei3 == 1) {
                jinzhi_huilu = 1;
            } else if (danwei3 == 2) {
                jinzhi_huilu = 0.001;
            } else if (danwei3 == 3) {
                jinzhi_huilu = 0.000001;
            }
            if ($("#part5_4_6_1_1").val() != "") {//标准值RN
                $("#part5_4_6_1_1").val((parseFloat($("#part5_4_6_1_1").val()) + parseFloat($("#part5_4_6_11_1").val()) * jinzhi_huilu).toString());
            }
            if ($("#part5_4_6_2_1").val() != "") {
                $("#part5_4_6_2_1").val((parseFloat($("#part5_4_6_2_1").val()) + parseFloat($("#part5_4_6_11_1").val()) * jinzhi_huilu).toString());
            }
            if ($("#part5_4_6_3_1").val() != "") {
                $("#part5_4_6_3_1").val((parseFloat($("#part5_4_6_3_1").val()) + parseFloat($("#part5_4_6_11_1").val()) * jinzhi_huilu).toString());
            }
            if ($("#part5_4_6_4_1").val() != "") {
                $("#part5_4_6_4_1").val((parseFloat($("#part5_4_6_4_1").val()) + parseFloat($("#part5_4_6_11_1").val()) * jinzhi_huilu).toString());
            }
            if ($("#part5_4_6_5_1").val() != "") {
                $("#part5_4_6_5_1").val((parseFloat($("#part5_4_6_5_1").val()) + parseFloat($("#part5_4_6_11_1").val()) * jinzhi_huilu).toString());
            }
            if ($("#part5_4_6_6_1").val() != "") {
                $("#part5_4_6_6_1").val((parseFloat($("#part5_4_6_6_1").val()) + parseFloat($("#part5_4_6_11_1").val()) * jinzhi_huilu).toString());
            }
            if ($("#part5_4_6_7_1").val() != "") {
                $("#part5_4_6_7_1").val((parseFloat($("#part5_4_6_7_1").val()) + parseFloat($("#part5_4_6_11_1").val()) * jinzhi_huilu).toString());
            }
            if ($("#part5_4_6_8_1").val() != "") {
                $("#part5_4_6_8_1").val((parseFloat($("#part5_4_6_8_1").val()) + parseFloat($("#part5_4_6_11_1").val()) * jinzhi_huilu).toString());
            }
            if ($("#part5_4_6_9_1").val() != "") {
                $("#part5_4_6_9_1").val((parseFloat($("#part5_4_6_9_1").val()) + parseFloat($("#part5_4_6_11_1").val()) * jinzhi_huilu).toString());
            }
            if ($("#part5_4_6_10_1").val() != "") {
                $("#part5_4_6_10_1").val((parseFloat($("#part5_4_6_10_1").val()) + parseFloat($("#part5_4_6_11_1").val()) * jinzhi_huilu).toString());
            }
        }
    });

    /**
     *  CC接地电阻菜单 Part1 全检量程区段 结束
     */


    /**
     * CC接地电阻菜单 Part2 非全检量程区段 开始
     */
    var time4 = 200;//延迟提交到时间ms
    var valuewei4 = 4;
    //获取数据 采样 非全检 part2 1
    $("#submit5_4_7_1_1").click(function () {
        $("#part5_4_7_1_1").val("");
        $("#submit5_4_7_1_1").val("获取中...");
        setTimeout(caiyangqj14, time4);//延迟500ms执行
    });
    //采样 非全检 part2  1
    function caiyangqj14() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_7_1_1").val(((parseFloat(data.average2)) * danweijinzhi4).toString());
                $("#part5_4_7_1_2").val(readValue($("#part5_4_7_1_1").val()));
                $("#submit5_4_7_1_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2  2
    $("#submit5_4_7_2_1").click(function () {
        $("#part5_4_7_2_1").val("");
        $("#submit5_4_7_2_1").val("获取中...");
        setTimeout(caiyangqj24, time4);//延迟500ms执行
    });
    //采样 非全检 part2 2
    function caiyangqj24() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_7_2_1").val(((parseFloat(data.average2)) * danweijinzhi4).toString());
                $("#part5_4_7_2_2").val(readValue($("#part5_4_7_2_1").val()));
                $("#submit5_4_7_2_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2 3
    $("#submit5_4_7_3_1").click(function () {
        $("#part5_4_7_3_1").val("");
        $("#submit5_4_7_3_1").val("获取中...");
        setTimeout(caiyangqj34, time4);//延迟500ms执行
    });
    //采样 非全检 part2 3
    function caiyangqj34() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_7_3_1").val(((parseFloat(data.average2)) * danweijinzhi4).toString());
                $("#part5_4_7_3_2").val(readValue($("#part5_4_7_3_1").val()));
                $("#submit5_4_7_3_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2 4
    $("#submit5_4_7_4_1").click(function () {
        $("#part5_4_7_4_1").val("");
        $("#submit5_4_7_4_1").val("获取中...");
        setTimeout(caiyangqj44, time4);//延迟500ms执行
    });
    //采样 非全检 part2 4
    function caiyangqj44() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_7_4_1").val(((parseFloat(data.average2)) * danweijinzhi4_2).toString());
                $("#part5_4_7_4_2").val(readValue($("#part5_4_7_4_1").val()));
                $("#submit5_4_7_4_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2 5
    $("#submit5_4_7_5_1").click(function () {
        $("#part5_4_7_5_1").val("");
        $("#submit5_4_7_5_1").val("获取中...");
        setTimeout(caiyangqj54, time4);//延迟500ms执行
    });
    //采样 非全检 part2 5
    function caiyangqj54() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_7_5_1").val(((parseFloat(data.average2)) * danweijinzhi4_2).toString());
                $("#part5_4_7_5_2").val(readValue($("#part5_4_7_5_1").val()));
                $("#submit5_4_7_5_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2 6
    $("#submit5_4_7_6_1").click(function () {
        $("#part5_4_7_6_1").val("");
        $("#submit5_4_7_6_1").val("获取中...");
        setTimeout(caiyangqj64, time4);//延迟500ms执行
    });
    //采样 非全检 part2 6
    function caiyangqj64() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_7_6_1").val(((parseFloat(data.average2)) * danweijinzhi4_2).toString());
                $("#part5_4_7_6_2").val(readValue($("#part5_4_7_6_1").val()));
                $("#submit5_4_7_6_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2 7
    $("#submit5_4_7_7_1").click(function () {
        $("#part5_4_7_7_1").val("");
        $("#submit5_4_7_7_1").val("获取中...");
        setTimeout(caiyangqj74, time4);//延迟500ms执行
    });
    //采样 非全检 part2 7
    function caiyangqj74() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_7_7_1").val(((parseFloat(data.average2)) * danweijinzhi4_3).toString());
                $("#part5_4_7_7_2").val(readValue($("#part5_4_7_7_1").val()));
                $("#submit5_4_7_7_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2 8
    $("#submit5_4_7_8_1").click(function () {
        $("#part5_4_7_8_1").val("");
        $("#submit5_4_7_8_1").val("获取中...");
        setTimeout(caiyangqj84, time4);//延迟500ms执行
    });
    //采样 非全检 part2 8
    function caiyangqj84() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_7_8_1").val(((parseFloat(data.average2)) * danweijinzhi4_3).toString());
                $("#part5_4_7_8_2").val(readValue($("#part5_4_7_8_1").val()));
                $("#submit5_4_7_8_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 采样 非全检 part2 9
    $("#submit5_4_7_9_1").click(function () {
        $("#part5_4_7_9_1").val("");
        $("#submit5_4_7_9_1").val("获取中...");
        setTimeout(caiyangqj94, time4);//延迟500ms执行
    });
    //采样 非全检 part2 9
    function caiyangqj94() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_7_9_1").val(((parseFloat(data.average2)) * danweijinzhi4_3).toString());
                $("#part5_4_7_9_2").val(readValue($("#part5_4_7_9_1").val()));
                $("#submit5_4_7_9_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //提交非全检量程区段
    $("#submit5_12").click(function () {
        if ($("#leixing5_1").text() == "" || $("#zsbh5_1").text() == "") {
            alert("请先选择一条待检测的送检仪器！")
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_addFQJData.action",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: {
                    "zsbh": $("#zsbh5_1").text(),//送检仪器证书编号
                    "dw1": $("input[name='check5_4']:checked").val(),//单位1/2/3--->m/欧/k
                    "dw2": $("input[name='check5_4_2']:checked").val(),//单位1/2/3--->m/欧/k
                    "dw3": $("input[name='check5_4_3']:checked").val(),//单位1/2/3--->m/欧/k
                    "bzz1": $("#part5_4_7_1_1").val(),//标准值RN
                    "dsz1": $("#part5_4_7_1_2").val(),//读数值RX
                    "bzz2": $("#part5_4_7_2_1").val(),
                    "dsz2": $("#part5_4_7_2_2").val(),
                    "bzz3": $("#part5_4_7_3_1").val(),
                    "dsz3": $("#part5_4_7_3_2").val(),
                    "bzz4": $("#part5_4_7_4_1").val(),
                    "dsz4": $("#part5_4_7_4_2").val(),
                    "bzz5": $("#part5_4_7_5_1").val(),
                    "dsz5": $("#part5_4_7_5_2").val(),
                    "bzz6": $("#part5_4_7_6_1").val(),
                    "dsz6": $("#part5_4_7_6_2").val(),
                    "bzz7": $("#part5_4_7_7_1").val(),
                    "dsz7": $("#part5_4_7_7_2").val(),
                    "bzz8": $("#part5_4_7_8_1").val(),
                    "dsz8": $("#part5_4_7_8_2").val(),
                    "bzz9": $("#part5_4_7_9_1").val(),
                    "dsz9": $("#part5_4_7_9_2").val()
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data.jsonObject == "1") {
                        $("#part5_4_11_4").html("数据提交成功！")
                    }
                    else {
                        alert("提交失败！")
                    }
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        }
    });

    //用于返回单位，当鼠标悬浮在标准值上时，显示值+单位 第一组
    function returnDW4() {
        switch ($("input[name='check5_4']:checked").val()) {
            case "1":
                return "mΩ";
                break;
            case "2":
                return "Ω";
                break;
            case "3":
                return "kΩ";
                break;
            default:
                return null;
                break;
        }
    }

    //处理单位之间的转换问题
    var danwei4 = 2;//默认为2，欧
    var danweijinzhi4 = 1;//默认为2，欧,用于后台传过来的值与之相乘
    // 单位为mΩ时,1
    $("#radio5_10").click(function () {
        if (danwei4 == 2) {
            var jinzhi = 1000;
            jinzhizhuanhuan4(jinzhi)
        } else if (danwei4 == 3) {
            var jinzhi = 1000000;
            jinzhizhuanhuan4(jinzhi)
        }
        danwei4 = 1;
        danweijinzhi4 = 1000;
    });

    //单位为Ω时,2
    $("#radio5_11").click(function () {
        if (danwei4 == 1) {
            var jinzhi = 0.001;
            jinzhizhuanhuan4(jinzhi)
        } else if (danwei4 == 3) {
            var jinzhi = 1000;
            jinzhizhuanhuan4(jinzhi)
        }
        danwei4 = 2;
        danweijinzhi4 = 1;
    });

    //单位为KΩ时,3
    $("#radio5_12").click(function () {
        if (danwei4 == 1) {
            var jinzhi = 0.000001;
            jinzhizhuanhuan4(jinzhi)
        } else if (danwei4 == 2) {
            var jinzhi = 0.001;
            jinzhizhuanhuan4(jinzhi)
        }
        danwei4 = 3;
        danweijinzhi4 = 0.001;
    });
    //进制转换公共程序 (Math.round((parseFloat($("#part5_4_6_5_2").val()) * jinzhi)/10)*10);
    function jinzhizhuanhuan4(jinzhi) {
        if ($("#part5_4_7_1_1").val() != "") {
            $("#part5_4_7_1_1").val((parseFloat($("#part5_4_7_1_1").val()) * jinzhi).toString());
        }
        //标准值RN
        if ($("#part5_4_7_1_2").val() != "") {
            $("#part5_4_7_1_2").val((parseFloat($("#part5_4_7_1_2").val()) * jinzhi).toString());
        }
        //读数值RX
        if ($("#part5_4_7_2_1").val() != "") {
            $("#part5_4_7_2_1").val((parseFloat($("#part5_4_7_2_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_7_2_2").val() != "") {
            $("#part5_4_7_2_2").val((parseFloat($("#part5_4_7_2_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_7_3_1").val() != "") {
            $("#part5_4_7_3_1").val((parseFloat($("#part5_4_7_3_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_7_3_2").val() != "") {
            $("#part5_4_7_3_2").val((parseFloat($("#part5_4_7_3_2").val()) * jinzhi).toString());
        }
    }

    //用于返回单位，当鼠标悬浮在标准值上时，显示值+单位 第二组
    function returnDW4_2() {
        switch ($("input[name='check5_4_2']:checked").val()) {
            case "1":
                return "mΩ";
                break;
            case "2":
                return "Ω";
                break;
            case "3":
                return "kΩ";
                break;
            default:
                return null;
                break;
        }
    }

    //处理单位之间的转换问题
    var danwei4_2 = 2;//默认为2，欧
    var danweijinzhi4_2 = 1;//默认为2，欧,用于后台传过来的值与之相乘
    // 单位为mΩ时,1
    $("#radio5_10_2").click(function () {
        if (danwei4_2 == 2) {
            var jinzhi = 1000;
            jinzhizhuanhuan4_2(jinzhi)
        } else if (danwei4_2 == 3) {
            var jinzhi = 1000000;
            jinzhizhuanhuan4_2(jinzhi)
        }
        danwei4_2 = 1;
        danweijinzhi4_2 = 1000;
    });

    //单位为Ω时,2
    $("#radio5_11_2").click(function () {
        if (danwei4_2 == 1) {
            var jinzhi = 0.001;
            jinzhizhuanhuan4_2(jinzhi)
        } else if (danwei4_2 == 3) {
            var jinzhi = 1000;
            jinzhizhuanhuan4_2(jinzhi)
        }
        danwei4_2 = 2;
        danweijinzhi4_2 = 1;
    });

    //单位为KΩ时,3
    $("#radio5_12_2").click(function () {
        if (danwei4_2 == 1) {
            var jinzhi = 0.000001;
            jinzhizhuanhuan4_2(jinzhi)
        } else if (danwei4_2 == 2) {
            var jinzhi = 0.001;
            jinzhizhuanhuan4_2(jinzhi)
        }
        danwei4_2 = 3;
        danweijinzhi4_2 = 0.001;
    });
    //进制转换公共程序
    function jinzhizhuanhuan4_2(jinzhi) {
        if ($("#part5_4_7_4_1").val() != "") {
            $("#part5_4_7_4_1").val((parseFloat($("#part5_4_7_4_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_7_4_2").val() != "") {
            $("#part5_4_7_4_2").val((parseFloat($("#part5_4_7_4_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_7_5_1").val() != "") {
            $("#part5_4_7_5_1").val((parseFloat($("#part5_4_7_5_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_7_5_2").val() != "") {
            $("#part5_4_7_5_2").val((parseFloat($("#part5_4_7_5_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_7_6_1").val() != "") {
            $("#part5_4_7_6_1").val((parseFloat($("#part5_4_7_6_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_7_6_2").val() != "") {
            $("#part5_4_7_6_2").val((parseFloat($("#part5_4_7_6_2").val()) * jinzhi).toString());
        }
    }

    //用于返回单位，当鼠标悬浮在标准值上时，显示值+单位 第三组
    function returnDW4_3() {
        switch ($("input[name='check5_4_3']:checked").val()) {
            case "1":
                return "mΩ";
                break;
            case "2":
                return "Ω";
                break;
            case "3":
                return "kΩ";
                break;
            default:
                return null;
                break;
        }
    }

    //处理单位之间的转换问题
    var danwei4_3 = 2;//默认为2，欧
    var danweijinzhi4_3 = 1;//默认为2，欧,用于后台传过来的值与之相乘
    // 单位为mΩ时,1
    $("#radio5_10_3").click(function () {
        if (danwei4_3 == 2) {
            var jinzhi = 1000;
            jinzhizhuanhuan4_3(jinzhi)
        } else if (danwei4_3 == 3) {
            var jinzhi = 1000000;
            jinzhizhuanhuan4_3(jinzhi)
        }
        danwei4_3 = 1;
        danweijinzhi4_3 = 1000;
    });

    //单位为Ω时,2
    $("#radio5_11_3").click(function () {
        if (danwei4_3 == 1) {
            var jinzhi = 0.001;
            jinzhizhuanhuan4_3(jinzhi)
        } else if (danwei4_3 == 3) {
            var jinzhi = 1000;
            jinzhizhuanhuan4_3(jinzhi)
        }
        danwei4_3 = 2;
        danweijinzhi4_3 = 1;
    });

    //单位为KΩ时,3
    $("#radio5_12_3").click(function () {
        if (danwei4_3 == 1) {
            var jinzhi = 0.000001;
            jinzhizhuanhuan4_3(jinzhi)
        } else if (danwei4_3 == 2) {
            var jinzhi = 0.001;
            jinzhizhuanhuan4_3(jinzhi)
        }
        danwei4_3 = 3;
        danweijinzhi4_3 = 0.001;
    });
    //进制转换公共程序
    function jinzhizhuanhuan4_3(jinzhi) {

        if ($("#part5_4_7_7_1").val() != "") {
            $("#part5_4_7_7_1").val((parseFloat($("#part5_4_7_7_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_7_7_2").val() != "") {
            $("#part5_4_7_7_2").val((parseFloat($("#part5_4_7_7_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_7_8_1").val() != "") {
            $("#part5_4_7_8_1").val((parseFloat($("#part5_4_7_8_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_7_8_2").val() != "") {
            $("#part5_4_7_8_2").val((parseFloat($("#part5_4_7_8_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_7_9_1").val() != "") {
            $("#part5_4_7_9_1").val((parseFloat($("#part5_4_7_9_1").val()) * jinzhi).toString());
        }
        if ($("#part5_4_7_9_2").val() != "") {
            $("#part5_4_7_9_2").val((parseFloat($("#part5_4_7_9_2").val()) * jinzhi).toString());
        }
    }

    /**
     * CC接地电阻菜单 Part2 非全检量程区段 结束
     */

    /**
     * CC接地电阻菜单  Part3 位置影响试验 开始
     */
    var time5 = 200;//延迟提交到时间ms
    var valuewei5 = 4;
    //2345->前后左右
    //获取数据 CC接地电阻菜单  Part3 位置影响试验 1-2 前
    $("#submit5_4_8_1_2").click(function () {
        $("#part5_4_8_1_2").val("");
        $("#submit5_4_8_1_2").val("获取中...");
        setTimeout(caiyangwz12, time5);//延迟500ms执行
    });
    //采样   1-2
    function caiyangwz12() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_8_1_2").val((parseFloat(data.average2) * danweijinzhi5_1).toString());
                $("#submit5_4_8_1_2").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part3 位置影响试验 1-3
    $("#submit5_4_8_1_3").click(function () {
        $("#part5_4_8_1_3").val("");
        $("#submit5_4_8_1_3").val("获取中...");
        setTimeout(caiyangwz13, time5);//延迟500ms执行
    });
    //采样   1-3
    function caiyangwz13() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_8_1_3").val((parseFloat(data.average2) * danweijinzhi5_1).toString());
                $("#submit5_4_8_1_3").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part3 位置影响试验 part1 1-4
    $("#submit5_4_8_1_4").click(function () {
        $("#part5_4_8_1_4").val("");
        $("#submit5_4_8_1_4").val("获取中...");
        setTimeout(caiyangwz14, time5);//延迟500ms执行
    });
    //采样   1-4
    function caiyangwz14() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_8_1_4").val((parseFloat(data.average2) * danweijinzhi5_1).toString());
                $("#submit5_4_8_1_4").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part3 位置影响试验 1-5
    $("#submit5_4_8_1_5").click(function () {
        $("#part5_4_8_1_5").val("");
        $("#submit5_4_8_1_5").val("获取中...");
        setTimeout(caiyangwz15, time5);//延迟500ms执行
    });
    //采样 全检 part1  1-5
    function caiyangwz15() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_8_1_5").val((parseFloat(data.average2) * danweijinzhi5_1).toString());
                $("#submit5_4_8_1_5").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //处理单位之间的转换问题 第一行数据
    var danwei5_1 = 2;//默认为2，欧
    var danweijinzhi5_1 = 1;//默认为2，欧,用于后台传过来的值与之相乘
    // 单位为mΩ时,1
    $("#radio5_13_1").click(function () {
        if (danwei5_1 == 2) {
            var jinzhi = 1000;
            jinzhizhuanhuan5_1(jinzhi)
        } else if (danwei5_1 == 3) {
            var jinzhi = 1000000;
            jinzhizhuanhuan5_1(jinzhi)
        }
        danwei5_1 = 1;
        danweijinzhi5_1 = 1000;
    });

    //单位为Ω时,2
    $("#radio5_14_1").click(function () {
        if (danwei5_1 == 1) {
            var jinzhi = 0.001;
            jinzhizhuanhuan5_1(jinzhi)
        } else if (danwei5_1 == 3) {
            var jinzhi = 1000;
            jinzhizhuanhuan5_1(jinzhi)
        }
        danwei5_1 = 2;
        danweijinzhi5_1 = 1;
    });

    //单位为KΩ时,3
    $("#radio5_15_1").click(function () {
        if (danwei5_1 == 1) {
            var jinzhi = 0.000001;
            jinzhizhuanhuan5_1(jinzhi)
        } else if (danwei5_1 == 2) {
            var jinzhi = 0.001;
            jinzhizhuanhuan5_1(jinzhi)
        }
        danwei5_1 = 3;
        danweijinzhi5_1 = 0.001;
    });
    //进制转换公共程序
    function jinzhizhuanhuan5_1(jinzhi) {
        if ($("#part5_4_8_1_2").val() != "") {
            $("#part5_4_8_1_2").val((parseFloat($("#part5_4_8_1_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_8_1_3").val() != "") {
            $("#part5_4_8_1_3").val((parseFloat($("#part5_4_8_1_3").val()) * jinzhi).toString());
        }
        if ($("#part5_4_8_1_4").val() != "") {
            $("#part5_4_8_1_4").val((parseFloat($("#part5_4_8_1_4").val()) * jinzhi).toString());
        }
        if ($("#part5_4_8_1_5").val() != "") {
            $("#part5_4_8_1_5").val((parseFloat($("#part5_4_8_1_5").val()) * jinzhi).toString());
        }
    }

    //获取数据 CC接地电阻菜单  Part3 位置影响试验 2-2
    $("#submit5_4_8_2_2").click(function () {
        $("#part5_4_8_2_2").val("");
        $("#submit5_4_8_2_2").val("获取中...");
        setTimeout(caiyangwz22, time5);//延迟500ms执行
    });
    //采样   2-2
    function caiyangwz22() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_8_2_2").val((parseFloat(data.average2) * danweijinzhi5_2).toString());
                $("#submit5_4_8_2_2").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part3 位置影响试验 2-3
    $("#submit5_4_8_2_3").click(function () {
        $("#part5_4_8_2_3").val("");
        $("#submit5_4_8_2_3").val("获取中...");
        setTimeout(caiyangwz23, time5);//延迟500ms执行
    });
    //采样   2-3
    function caiyangwz23() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_8_2_3").val((parseFloat(data.average2) * danweijinzhi5_2).toString());
                $("#submit5_4_8_2_3").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part3 位置影响试验 2-4
    $("#submit5_4_8_2_4").click(function () {
        $("#part5_4_8_2_4").val("");
        $("#submit5_4_8_2_4").val("获取中...");
        setTimeout(caiyangwz24, time5);//延迟500ms执行
    });
    //采样   2-4
    function caiyangwz24() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_8_2_4").val((parseFloat(data.average2) * danweijinzhi5_2).toString());
                $("#submit5_4_8_2_4").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part3 位置影响试验 2-5
    $("#submit5_4_8_2_5").click(function () {
        $("#part5_4_8_2_5").val("");
        $("#submit5_4_8_2_5").val("获取中...");
        setTimeout(caiyangwz25, time5);//延迟500ms执行
    });
    //采样 全检 part1  2-5
    function caiyangwz25() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_8_2_5").val((parseFloat(data.average2) * danweijinzhi5_2).toString());
                $("#submit5_4_8_2_5").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //处理单位之间的转换问题 第二行数据
    var danwei5_2 = 2;//默认为2，欧
    var danweijinzhi5_2 = 1;//默认为2，欧,用于后台传过来的值与之相乘
    // 单位为mΩ时,1
    $("#radio5_13_2").click(function () {
        if (danwei5_2 == 2) {
            var jinzhi = 1000;
            jinzhizhuanhuan5_2(jinzhi)
        } else if (danwei5_2 == 3) {
            var jinzhi = 1000000;
            jinzhizhuanhuan5_2(jinzhi)
        }
        danwei5_2 = 1;
        danweijinzhi5_2 = 1000;
    });

    //单位为Ω时,2
    $("#radio5_14_2").click(function () {
        if (danwei5_2 == 1) {
            var jinzhi = 0.001;
            jinzhizhuanhuan5_2(jinzhi)
        } else if (danwei5_2 == 3) {
            var jinzhi = 1000;
            jinzhizhuanhuan5_2(jinzhi)
        }
        danwei5_2 = 2;
        danweijinzhi5_2 = 1;
    });

    //单位为KΩ时,3
    $("#radio5_15_2").click(function () {
        if (danwei5_2 == 1) {
            var jinzhi = 0.000001;
            jinzhizhuanhuan5_2(jinzhi)
        } else if (danwei5_2 == 2) {
            var jinzhi = 0.001;
            jinzhizhuanhuan5_2(jinzhi)
        }
        danwei5_2 = 3;
        danweijinzhi5_2 = 0.001;
    });
    //进制转换公共程序
    function jinzhizhuanhuan5_2(jinzhi) {
        if ($("#part5_4_8_2_2").val() != "") {
            $("#part5_4_8_2_2").val((parseFloat($("#part5_4_8_2_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_8_2_3").val() != "") {
            $("#part5_4_8_2_3").val((parseFloat($("#part5_4_8_2_3").val()) * jinzhi).toString());
        }
        if ($("#part5_4_8_2_4").val() != "") {
            $("#part5_4_8_2_4").val((parseFloat($("#part5_4_8_2_4").val()) * jinzhi).toString());
        }
        if ($("#part5_4_8_2_5").val() != "") {
            $("#part5_4_8_2_5").val((parseFloat($("#part5_4_8_2_5").val()) * jinzhi).toString());
        }
    }

    //获取数据 CC接地电阻菜单  Part3 位置影响试验 3-2
    $("#submit5_4_8_3_2").click(function () {
        $("#part5_4_8_3_2").val("");
        $("#submit5_4_8_3_2").val("获取中...");
        setTimeout(caiyangwz32, time5);//延迟500ms执行
    });
    //采样   3-2
    function caiyangwz32() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_8_3_2").val((parseFloat(data.average2) * danweijinzhi5_3).toString());
                $("#submit5_4_8_3_2").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part3 位置影响试验 3-3
    $("#submit5_4_8_3_3").click(function () {
        $("#part5_4_8_3_3").val("");
        $("#submit5_4_8_3_3").val("获取中...");
        setTimeout(caiyangwz33, time5);//延迟500ms执行
    });
    //采样   3-3
    function caiyangwz33() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_8_3_3").val((parseFloat(data.average2) * danweijinzhi5_3).toString());
                $("#submit5_4_8_3_3").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part3 位置影响试验  3-4
    $("#submit5_4_8_3_4").click(function () {
        $("#part5_4_8_3_4").val("");
        $("#submit5_4_8_3_4").val("获取中...");
        setTimeout(caiyangwz34, time5);//延迟500ms执行
    });
    //采样   3-4
    function caiyangwz34() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_8_3_4").val((parseFloat(data.average2) * danweijinzhi5_3).toString());
                $("#submit5_4_8_3_4").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part3 位置影响试验 3-5
    $("#submit5_4_8_3_5").click(function () {
        $("#part5_4_8_3_5").val("");
        $("#submit5_4_8_3_5").val("获取中...");
        setTimeout(caiyangwz35, time5);//延迟500ms执行
    });
    //采样   3-5
    function caiyangwz35() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_8_3_5").val((parseFloat(data.average2) * danweijinzhi5_3).toString());
                $("#submit5_4_8_3_5").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //处理单位之间的转换问题 第三行数据
    var danwei5_3 = 2;//默认为2，欧
    var danweijinzhi5_3 = 1;//默认为2，欧,用于后台传过来的值与之相乘
    // 单位为mΩ时,1
    $("#radio5_13_3").click(function () {
        if (danwei5_3 == 2) {
            var jinzhi = 1000;
            jinzhizhuanhuan5_3(jinzhi)
        } else if (danwei5_3 == 3) {
            var jinzhi = 1000000;
            jinzhizhuanhuan5_3(jinzhi)
        }
        danwei5_3 = 1;
        danweijinzhi5_3 = 1000;
    });

    //单位为Ω时,2
    $("#radio5_14_3").click(function () {
        if (danwei5_3 == 1) {
            var jinzhi = 0.001;
            jinzhizhuanhuan5_3(jinzhi)
        } else if (danwei5_3 == 3) {
            var jinzhi = 1000;
            jinzhizhuanhuan5_3(jinzhi)
        }
        danwei5_3 = 2;
        danweijinzhi5_3 = 1;
    });

    //单位为KΩ时,3
    $("#radio5_15_3").click(function () {
        if (danwei5_3 == 1) {
            var jinzhi = 0.000001;
            jinzhizhuanhuan5_3(jinzhi)
        } else if (danwei5_3 == 2) {
            var jinzhi = 0.001;
            jinzhizhuanhuan5_3(jinzhi)
        }
        danwei5_3 = 3;
        danweijinzhi5_3 = 0.001;
    });
    //进制转换公共程序
    function jinzhizhuanhuan5_3(jinzhi) {
        if ($("#part5_4_8_3_2").val() != "") {
            $("#part5_4_8_3_2").val((parseFloat($("#part5_4_8_3_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_8_3_3").val() != "") {
            $("#part5_4_8_3_3").val((parseFloat($("#part5_4_8_3_3").val()) * jinzhi).toString());
        }
        if ($("#part5_4_8_3_4").val() != "") {
            $("#part5_4_8_3_4").val((parseFloat($("#part5_4_8_3_4").val()) * jinzhi).toString());
        }
        if ($("#part5_4_8_3_5").val() != "") {
            $("#part5_4_8_3_5").val((parseFloat($("#part5_4_8_3_5").val()) * jinzhi).toString());
        }
    }

    //提交位置影响试验
    $("#submit5_5").click(function () {
        if ($("#leixing5_1").text() == "" || $("#zsbh5_1").text() == "") {
            alert("请先选择一条待检测的送检仪器！")
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_addPositionEffectData.action",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: {
                    "zsbh": $("#zsbh5_1").text(),//送检仪器证书编号 TODO
                    "dw1": $("input[name='check5_5_1']:checked").val(),//单位1/2/3--->m/欧/k
                    "dw2": $("input[name='check5_5_2']:checked").val(),//单位1/2/3--->m/欧/k
                    "dw3": $("input[name='check5_5_3']:checked").val(),//单位1/2/3--->m/欧/k
                    "lc1": $("#part5_4_8_1_1").val(),
                    "value11": $("#part5_4_8_1_2").val(),//1234->前后左右
                    "value12": $("#part5_4_8_1_3").val(),
                    "value13": $("#part5_4_8_1_4").val(),
                    "value14": $("#part5_4_8_1_5").val(),
                    "lc2": $("#part5_4_8_2_1").val(),
                    "value21": $("#part5_4_8_2_2").val(),
                    "value22": $("#part5_4_8_2_3").val(),
                    "value23": $("#part5_4_8_2_4").val(),
                    "value24": $("#part5_4_8_2_5").val(),
                    "lc3": $("#part5_4_8_3_1").val(),
                    "value31": $("#part5_4_8_3_2").val(),
                    "value32": $("#part5_4_8_3_3").val(),
                    "value33": $("#part5_4_8_3_4").val(),
                    "value34": $("#part5_4_8_3_5").val()
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data.jsonObject == "1") {
                        $("#part5_4_11_5").html("数据提交成功！")
                    }
                    else {
                        alert("提交失败！")
                    }
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        }
    });
    /**
     * CC接地电阻菜单  Part3 位置影响试验 结束
     */

    /**
     * CC接地电阻菜单  Part4 辅助接地电阻影响试验 开始
     */
    var time6 = 200;//延迟提交到时间ms
    var valuewei6 = 4;
    //23456->0 500 1000 2000 5000
    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 1-2
    $("#submit5_4_9_1_2").click(function () {
        $("#part5_4_9_1_2").val("");
        $("#submit5_4_9_1_2").val("获取中...");
        setTimeout(caiyangfz12, time6);//延迟500ms执行
    });
    //采样   1-2  代表第一行第二个输入框
    function caiyangfz12() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_1_2").val((parseFloat(data.average2) * danweijinzhi6_1).toString());
                $("#submit5_4_9_1_2").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 1-3
    $("#submit5_4_9_1_3").click(function () {
        $("#part5_4_9_1_3").val("");
        $("#submit5_4_9_1_3").val("获取中...");
        setTimeout(caiyangfz13, time6);//延迟500ms执行
    });
    //采样   1-3  代表第1行第3个输入框
    function caiyangfz13() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_1_3").val((parseFloat(data.average2) * danweijinzhi6_1).toString());
                $("#submit5_4_9_1_3").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 1-4
    $("#submit5_4_9_1_4").click(function () {
        $("#part5_4_9_1_4").val("");
        $("#submit5_4_9_1_4").val("获取中...");
        setTimeout(caiyangfz14, time6);//延迟500ms执行
    });
    //采样   1-4
    function caiyangfz14() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_1_4").val((parseFloat(data.average2) * danweijinzhi6_1).toString());
                $("#submit5_4_9_1_4").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 1-5
    $("#submit5_4_9_1_5").click(function () {
        $("#part5_4_9_1_5").val("");
        $("#submit5_4_9_1_5").val("获取中...");
        setTimeout(caiyangfz15, time6);//延迟500ms执行
    });
    //采样   1-5
    function caiyangfz15() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_1_5").val((parseFloat(data.average2) * danweijinzhi6_1).toString());
                $("#submit5_4_9_1_5").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 1-6
    $("#submit5_4_9_1_6").click(function () {
        $("#part5_4_9_1_6").val("");
        $("#submit5_4_9_1_6").val("获取中...");
        setTimeout(caiyangfz16, time6);//延迟500ms执行
    });
    //采样   1-6
    function caiyangfz16() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_1_6").val((parseFloat(data.average2) * danweijinzhi6_1).toString());
                $("#submit5_4_9_1_6").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //处理单位之间的转换问题 第一行数据
    var danwei6_1 = 2;//默认为2，欧
    var danweijinzhi6_1 = 1;//默认为2，欧,用于后台传过来的值与之相乘
    // 单位为mΩ时,1
    $("#radio5_16_1").click(function () {
        if (danwei6_1 == 2) {
            var jinzhi = 1000;
            jinzhizhuanhuan6_1(jinzhi)
        } else if (danwei6_1 == 3) {
            var jinzhi = 1000000;
            jinzhizhuanhuan6_1(jinzhi)
        }
        danwei6_1 = 1;
        danweijinzhi6_1 = 1000;
    });

    //单位为Ω时,2
    $("#radio5_17_1").click(function () {
        if (danwei6_1 == 1) {
            var jinzhi = 0.001;
            jinzhizhuanhuan6_1(jinzhi)
        } else if (danwei6_1 == 3) {
            var jinzhi = 1000;
            jinzhizhuanhuan6_1(jinzhi)
        }
        danwei6_1 = 2;
        danweijinzhi6_1 = 1;
    });

    //单位为KΩ时,3
    $("#radio5_18_1").click(function () {
        if (danwei6_1 == 1) {
            var jinzhi = 0.000001;
            jinzhizhuanhuan6_1(jinzhi)
        } else if (danwei6_1 == 2) {
            var jinzhi = 0.001;
            jinzhizhuanhuan6_1(jinzhi)
        }
        danwei6_1 = 3;
        danweijinzhi6_1 = 0.001;
    });
    //进制转换公共程序
    function jinzhizhuanhuan6_1(jinzhi) {
        if ($("#part5_4_9_1_2").val() != "") {
            $("#part5_4_9_1_2").val((parseFloat($("#part5_4_9_1_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_9_1_3").val() != "") {
            $("#part5_4_9_1_3").val((parseFloat($("#part5_4_9_1_3").val()) * jinzhi).toString());
        }
        if ($("#part5_4_9_1_4").val() != "") {
            $("#part5_4_9_1_4").val((parseFloat($("#part5_4_9_1_4").val()) * jinzhi).toString());
        }
        if ($("#part5_4_9_1_5").val() != "") {
            $("#part5_4_9_1_5").val((parseFloat($("#part5_4_9_1_5").val()) * jinzhi).toString());
        }
        if ($("#part5_4_9_1_6").val() != "") {
            $("#part5_4_9_1_6").val((parseFloat($("#part5_4_9_1_6").val()) * jinzhi).toString());
        }
    }

    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 2-2
    $("#submit5_4_9_2_2").click(function () {
        $("#part5_4_9_2_2").val("");
        $("#submit5_4_9_2_2").val("获取中...");
        setTimeout(caiyangfz22, time6);//延迟500ms执行
    });
    //采样   2-2  代表第2行第2个输入框
    function caiyangfz22() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_2_2").val((parseFloat(data.average2) * danweijinzhi6_2).toString());
                $("#submit5_4_9_2_2").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 2-3
    $("#submit5_4_9_2_3").click(function () {
        $("#part5_4_9_2_3").val("");
        $("#submit5_4_9_2_3").val("获取中...");
        setTimeout(caiyangfz23, time6);//延迟500ms执行
    });
    //采样   2-3  代表第1行第3个输入框
    function caiyangfz23() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_2_3").val((parseFloat(data.average2) * danweijinzhi6_2).toString());
                $("#submit5_4_9_2_3").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 2-4
    $("#submit5_4_9_2_4").click(function () {
        $("#part5_4_9_2_4").val("");
        $("#submit5_4_9_2_4").val("获取中...");
        setTimeout(caiyangfz24, time6);//延迟500ms执行
    });
    //采样   2-4
    function caiyangfz24() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_2_4").val((parseFloat(data.average2) * danweijinzhi6_2).toString());
                $("#submit5_4_9_2_4").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 2-5
    $("#submit5_4_9_2_5").click(function () {
        $("#part5_4_9_2_5").val("");
        $("#submit5_4_9_2_5").val("获取中...");
        setTimeout(caiyangfz25, time6);//延迟500ms执行
    });
    //采样   2-5
    function caiyangfz25() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_2_5").val((parseFloat(data.average2) * danweijinzhi6_2).toString());
                $("#submit5_4_9_2_5").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 2-6
    $("#submit5_4_9_2_6").click(function () {
        $("#part5_4_9_2_6").val("");
        $("#submit5_4_9_2_6").val("获取中...");
        setTimeout(caiyangfz26, time6);//延迟500ms执行
    });
    //采样   2-6
    function caiyangfz26() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_2_6").val((parseFloat(data.average2) * danweijinzhi6_2).toString());
                $("#submit5_4_9_2_6").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //处理单位之间的转换问题 第二行数据
    var danwei6_2 = 2;//默认为2，欧
    var danweijinzhi6_2 = 1;//默认为2，欧,用于后台传过来的值与之相乘
    // 单位为mΩ时,1
    $("#radio5_16_2").click(function () {
        if (danwei6_2 == 2) {
            var jinzhi = 1000;
            jinzhizhuanhuan6_2(jinzhi)
        } else if (danwei6_2 == 3) {
            var jinzhi = 1000000;
            jinzhizhuanhuan6_2(jinzhi)
        }
        danwei6_2 = 1;
        danweijinzhi6_2 = 1000;
    });

    //单位为Ω时,2
    $("#radio5_17_2").click(function () {
        if (danwei6_2 == 1) {
            var jinzhi = 0.001;
            jinzhizhuanhuan6_2(jinzhi)
        } else if (danwei6_2 == 3) {
            var jinzhi = 1000;
            jinzhizhuanhuan6_2(jinzhi)
        }
        danwei6_2 = 2;
        danweijinzhi6_2 = 1;
    });

    //单位为KΩ时,3
    $("#radio5_18_2").click(function () {
        if (danwei6_2 == 1) {
            var jinzhi = 0.000001;
            jinzhizhuanhuan6_2(jinzhi)
        } else if (danwei6_2 == 2) {
            var jinzhi = 0.001;
            jinzhizhuanhuan6_2(jinzhi)
        }
        danwei6_2 = 3;
        danweijinzhi6_2 = 0.001;
    });
    //进制转换公共程序
    function jinzhizhuanhuan6_2(jinzhi) {
        if ($("#part5_4_9_2_2").val() != "") {
            $("#part5_4_9_2_2").val((parseFloat($("#part5_4_9_2_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_9_2_3").val() != "") {
            $("#part5_4_9_2_3").val((parseFloat($("#part5_4_9_2_3").val()) * jinzhi).toString());
        }
        if ($("#part5_4_9_2_4").val() != "") {
            $("#part5_4_9_2_4").val((parseFloat($("#part5_4_9_2_4").val()) * jinzhi).toString());
        }
        if ($("#part5_4_9_2_5").val() != "") {
            $("#part5_4_9_2_5").val((parseFloat($("#part5_4_9_2_5").val()) * jinzhi).toString());
        }
        if ($("#part5_4_9_2_6").val() != "") {
            $("#part5_4_9_2_6").val((parseFloat($("#part5_4_9_2_6").val()) * jinzhi).toString());
        }
    }

    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 3-2
    $("#submit5_4_9_3_2").click(function () {
        $("#part5_4_9_3_2").val("");
        $("#submit5_4_9_3_2").val("获取中...");
        setTimeout(caiyangfz32, time6);//延迟500ms执行
    });
    //采样   3-2  代表第3行第2个输入框
    function caiyangfz32() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_3_2").val((parseFloat(data.average2) * danweijinzhi6_3).toString());
                $("#submit5_4_9_3_2").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 3-3
    $("#submit5_4_9_3_3").click(function () {
        $("#part5_4_9_3_3").val("");
        $("#submit5_4_9_3_3").val("获取中...");
        setTimeout(caiyangfz33, time6);//延迟500ms执行
    });
    //采样   3-3  代表第1行第3个输入框
    function caiyangfz33() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_3_3").val((parseFloat(data.average2) * danweijinzhi6_3).toString());
                $("#submit5_4_9_3_3").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 3-4
    $("#submit5_4_9_3_4").click(function () {
        $("#part5_4_9_3_4").val("");
        $("#submit5_4_9_3_4").val("获取中...");
        setTimeout(caiyangfz34, time6);//延迟500ms执行
    });
    //采样   3-4
    function caiyangfz34() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_3_4").val((parseFloat(data.average2) * danweijinzhi6_3).toString());
                $("#submit5_4_9_3_4").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 3-5
    $("#submit5_4_9_3_5").click(function () {
        $("#part5_4_9_3_5").val("");
        $("#submit5_4_9_3_5").val("获取中...");
        setTimeout(caiyangfz35, time6);//延迟500ms执行
    });
    //采样   3-5
    function caiyangfz35() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_3_5").val((parseFloat(data.average2) * danweijinzhi6_3).toString());
                $("#submit5_4_9_3_5").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 CC接地电阻菜单  Part4 辅助接地电阻影响试验 3-6
    $("#submit5_4_9_3_6").click(function () {
        $("#part5_4_9_3_6").val("");
        $("#submit5_4_9_3_6").val("获取中...");
        setTimeout(caiyangfz36, time6);//延迟500ms执行
    });
    //采样   3-6
    function caiyangfz36() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#part5_4_9_3_6").val((parseFloat(data.average2) * danweijinzhi6_3).toString());
                $("#submit5_4_9_3_6").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //处理单位之间的转换问题 第二行数据
    var danwei6_3 = 2;//默认为2，欧
    var danweijinzhi6_3 = 1;//默认为2，欧,用于后台传过来的值与之相乘
    // 单位为mΩ时,1
    $("#radio5_16_3").click(function () {
        if (danwei6_3 == 2) {
            var jinzhi = 1000;
            jinzhizhuanhuan6_3(jinzhi)
        } else if (danwei6_3 == 3) {
            var jinzhi = 1000000;
            jinzhizhuanhuan6_3(jinzhi)
        }
        danwei6_3 = 1;
        danweijinzhi6_3 = 1000;
    });

    //单位为Ω时,2
    $("#radio5_17_3").click(function () {
        if (danwei6_3 == 1) {
            var jinzhi = 0.001;
            jinzhizhuanhuan6_3(jinzhi)
        } else if (danwei6_3 == 3) {
            var jinzhi = 1000;
            jinzhizhuanhuan6_3(jinzhi)
        }
        danwei6_3 = 2;
        danweijinzhi6_3 = 1;
    });

    //单位为KΩ时,3
    $("#radio5_18_3").click(function () {
        if (danwei6_3 == 1) {
            var jinzhi = 0.000001;
            jinzhizhuanhuan6_3(jinzhi)
        } else if (danwei6_3 == 2) {
            var jinzhi = 0.001;
            jinzhizhuanhuan6_3(jinzhi)
        }
        danwei6_3 = 3;
        danweijinzhi6_3 = 0.001;
    });
    //进制转换公共程序
    function jinzhizhuanhuan6_3(jinzhi) {
        if ($("#part5_4_9_3_2").val() != "") {
            $("#part5_4_9_3_2").val((parseFloat($("#part5_4_9_3_2").val()) * jinzhi).toString());
        }
        if ($("#part5_4_9_3_3").val() != "") {
            $("#part5_4_9_3_3").val((parseFloat($("#part5_4_9_3_3").val()) * jinzhi).toString());
        }
        if ($("#part5_4_9_3_4").val() != "") {
            $("#part5_4_9_3_4").val((parseFloat($("#part5_4_9_3_4").val()) * jinzhi).toString());
        }
        if ($("#part5_4_9_3_5").val() != "") {
            $("#part5_4_9_3_5").val((parseFloat($("#part5_4_9_3_5").val()) * jinzhi).toString());
        }
        if ($("#part5_4_9_3_6").val() != "") {
            $("#part5_4_9_3_6").val((parseFloat($("#part5_4_9_3_6").val()) * jinzhi).toString());
        }
    }

    //提交辅助接地电阻影响试验
    $("#submit5_7").click(function () {
        if ($("#leixing5_1").text() == "" || $("#zsbh5_1").text() == "") {
            alert("请先选择一条待检测的送检仪器！")
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_addAssistantData.action",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: {
                    "zsbh": $("#zsbh5_1").text(),//送检仪器证书编号 TODO
                    "dw1": $("input[name='check5_6_1']:checked").val(),//单位1/2/3--->m/欧/k
                    "dw2": $("input[name='check5_6_2']:checked").val(),//单位1/2/3--->m/欧/k
                    "dw3": $("input[name='check5_6_3']:checked").val(),//单位1/2/3--->m/欧/k
                    "lc1": $("#part5_4_9_1_1").val(),
                    "value11": $("#part5_4_9_1_2").val(),//1234->前后左右
                    "value12": $("#part5_4_9_1_3").val(),
                    "value13": $("#part5_4_9_1_4").val(),
                    "value14": $("#part5_4_9_1_5").val(),
                    "value15": $("#part5_4_9_1_6").val(),
                    "lc2": $("#part5_4_9_2_1").val(),
                    "value21": $("#part5_4_9_2_2").val(),
                    "value22": $("#part5_4_9_2_3").val(),
                    "value23": $("#part5_4_9_2_4").val(),
                    "value24": $("#part5_4_9_2_5").val(),
                    "value25": $("#part5_4_9_2_6").val(),
                    "lc3": $("#part5_4_9_3_1").val(),
                    "value31": $("#part5_4_9_3_2").val(),
                    "value32": $("#part5_4_9_3_3").val(),
                    "value33": $("#part5_4_9_3_4").val(),
                    "value34": $("#part5_4_9_3_5").val(),
                    "value35": $("#part5_4_9_3_6").val()
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data.jsonObject == "1") {
                        $("#part5_4_11_6").html("数据提交成功！")
                    }
                    else {
                        alert("提交失败！")
                    }
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        }
    });
    /**
     * CC接地电阻菜单  Part4 辅助接地电阻影响试验 结束
     */

    /**
     * BB电压菜单 开始
     */
        //获取数据 开路测量电压
    $("#submit5_4_3_1_1").click(function () {
        $("#part5_4_3_1_1").val("");
        $("#submit5_4_3_1_1").val("获取中...");
        setTimeout(caiyangdy1, time);//延迟500ms执行
    });
    //采样 电压
    function caiyangdy1() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {

                $("#part5_4_3_1_1").val(data.average3);
                $("#submit5_4_3_1_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //获取数据 跌落（中值）电压
    $("#submit5_4_3_2_1").click(function () {
        $("#part5_4_3_2_1").val("");
        $("#submit5_4_3_2_1").val("获取中...");
        setTimeout(caiyangdy2, time);//延迟500ms执行
    });
    //采样 电压
    function caiyangdy2() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {

                $("#part5_4_3_2_1").val(data.average3);
                $("#submit5_4_3_2_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    //提交 开路测量电压and跌落（中值）电压
    $("#submit5_4_3_3").click(function () {
        if ($("#leixing5_1").text() == "" || $("#zsbh5_1").text() == "") {
            alert("请先选择一条待检测的送检仪器！")
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_addKLDL.action",
                contentType: "application/x-www-form-urlencoded;charset=utf-8",
                data: {
                    "zsbh": $("#zsbh5_1").text(),//送检仪器证书编号 TODO
                    "kailu": $("#part5_4_3_1_1").val(),
                    "dieluo": $("#part5_4_3_2_1").val()
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data.jsonObject == "1") {
                        alert("电压值提交成功！")
                    }
                    else {
                        alert("提交失败！")
                    }
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        }
    });
    /**
     * BB电压菜单 结束
     */

    /**
     * DD电流菜单 开始
     */
        //获取数据 采样
    $("#submit5_4_10_1_1").click(function () {
        $("#part5_4_10_1_1").val("");
        $("#submit5_4_10_1_1").val("获取中...");
        setTimeout(caiyangdl, time);//延迟500ms执行
    });
    //采样
    function caiyangdl() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_getCaiyangDataPart1.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {

                $("#part5_4_10_1_1").val(data.average3);
                $("#submit5_4_10_1_1").val("获取数据");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    }

    /**
     * DD电流菜单 结束
     */
});
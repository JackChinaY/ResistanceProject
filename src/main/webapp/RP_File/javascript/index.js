$(function () {
    //隐藏或显示的速度
    var speed_value = 400;

    //tab标签切换
    function tabs(tabTit, on, tabCon) {
        $(tabCon).each(function () {
            $(this).children().hide();
            $(this).children().eq(6).show();//0代表第一个
        });
        //$(tabTit).each(function () {
        //    $(this).children().eq(0).addClass(on);
        //});
        $(tabTit).children().click(function () {
            if ($.session.get("username") != null) {
                $(this).addClass(on).siblings().removeClass(on);
                var index = $(tabTit).children().index(this);
                $(tabCon).children().eq(index).show().siblings().hide();
            } else {
                alert("请您先登录！")
            }
        });
    }

    tabs(".choice", "on", ".context");

    //对日期字符串进行截取,2017-01-01变为2017年01月01日，后台传来的数据处理后放到表格里
    function formatdatetime(temp) {
        return temp.substr(0, 4) + "年" + temp.substr(5, 2) + "月" + temp.substr(8, 2) + "日";//substr(0,4),0表示开始位置，4表示长度
    }

    //对日期字符串进行截取,2017年01月01日变为2017-01-01，表格中的数据传到修改区
    function formatdatetime1(temp) {
        return temp.substr(0, 4) + "-" + temp.substr(5, 2) + "-" + temp.substr(8, 2);//substr(0,4),0表示开始位置，4表示长度
    }

    //对日期字符串进行截取,2017-01-03 00:00:00变为2017-01-03，后台传来的数据传到修改区
    function formatdatetime2(temp) {
        return temp.substr(0, 10);//substr(0,4),0表示开始位置，4表示长度
    }

    //时间日期格式化
    Date.prototype.format = function (format) {
        var o = {
            "M+": this.getMonth() + 1, //month
            "d+": this.getDate(), //day
            "h+": this.getHours(), //hour
            "m+": this.getMinutes(), //minute
            "s+": this.getSeconds(), //second
            "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
            "S": this.getMilliseconds() //millisecond
        };

        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };

    /**
     * 实现左部位置到顶部时就静止
     * @type {jQuery}
     */
        //获取要定位元素距离浏览器顶部的距离
    var navH = $(".left").offset().top;
    //滚动条事件
    $(window).scroll(function () {
        //获取滚动条的滑动距离
        var scroH = $(this).scrollTop();
        //滚动条的滑动距离大于等于定位元素距离浏览器顶部的距离，就固定，反之就不固定
        if (scroH >= navH) {
            $(".left").css({"position": "fixed", "top": 0});
        } else if (scroH < navH) {
            $(".left").css({"position": "static"});
        }
    });

    ////获取当前时间,2017-01-03 00:00:00变为2017-01-03
    //function getCurrentTime() {
    //    var d = new Date();
    //    var str = '';
    //    str += d.getFullYear()+'-';
    //    str  += d.getMonth() + 1+'-';
    //    str  += d.getDate();
    //    return str;
    //}

    //登录
    $("#submitlogin").click(function () {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_login.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                "username": $("#username").val(),
                "password": $("#password").val()
            },
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.jsonObject == "登录成功") {
                    $.session.set("username", data.username);
                    $("#p1").hide();
                    $("#p2").show();
                    $("#p3").hide();
                    $("#p4").show();
                    $("#successlogin").html("欢迎：" + $.session.get("username") + "&nbsp;！");
                } else {

                    alert("账号或密码错误！")
                }
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    });

    //注销
    $("#loginout").click(function () {
        if ($.session.get("username") != null) {
            $("#p1").show();
            $("#p2").hide();
            $("#p3").hide();
            $.session.remove("username");
            alert("退出成功！");
        } else {
            alert("退出失败！");
        }
    });

    function loginsuccess() {
        $("#p2").hide();
        $("#p3").hide();
        if ($.session.get("username") != null) {
            $("#successlogin").html("欢迎：" + $.session.get("username") + "&nbsp;！");
            $("#p1").hide();
            $("#p2").show();
        }
    }

    loginsuccess();

    //注册
    $("#register").click(function () {
        $("#p1").hide();
        $("#p2").hide();
        $("#p3").show();

        $("#submitpregister").click(function () {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_register.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "username": $("#username1").val(),
                    "password": $("#password1").val(),
                    "email": $("#email").val()
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    alert(data.jsonObject + "请登录！");
                    $("#p1").show();
                    $("#p2").hide();
                    $("#p3").hide();
                    //location.href = "index.html";
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        });
    });
    /**
     * part1 送检仪器录入  开始
     */

    //初始化时间窗口
    $("#songjian").click(function () {
        $("#jdsj1").val(new Date().format("yyyy-MM-dd"));
        $("#yxqsj1").val(new Date().format("yyyy-MM-dd"));

    });
    //送检仪器信息录入
    $("#submit1").click(function () {
        if ($.session.get("username") != null) {
            if ($("#zsbh1").val() == "") {
                alert("证书编号不能为空！")
            } else if ($("#zsbhyanzheng").text() == "已被使用！") {
                alert("该证书编号在数据库中已存在！")
            } else if ($("#zsbhyanzheng").text() == "验证通过！") {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/ResistanceProject/Action_addInspectionDevice.action",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    data: {
                        "leixing": $("#leixing1 option:selected").val(),
                        "xinghao": $("#xinghao1").val(),
                        "yqmc": $("#yqmc1").val(),
                        "yqbh": $("#yqbh1").val(),
                        "sjdw": $("#sjdw1").val(),
                        "zqddj": $("#zqddj1").val(),
                        "clfw": $("#clfw1").val(),
                        "sccj": $("#sccj1").val(),
                        "jddd": $("#jddd1").val(),
                        "wendu": $("#wendu1").val(),
                        "shidu": $("#shidu1").val(),
                        "jdsj": $("#jdsj1").val(),
                        "yxqsj": $("#yxqsj1").val(),
                        "jdyj": $("#jdyj1").val(),
                        "zsbh": $("#zsbh1").val()
                    },
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        if (data.jsonObject == "录入成功！") {
                            alert("证书编号：" + $("#zsbh1").val() + "录入成功！");
                            $("input[name='sjyqxxlr']").val(""); // 将name=sjyqxxlr的文本框清空，以便重新输入
                            $("#zsbhyanzheng").text("");
                            $("#jdsj1").val(new Date().format("yyyy-MM-dd"));
                            $("#yxqsj1").val(new Date().format("yyyy-MM-dd"));
                            //$("#submit1").attr("disabled", true);
                        } else {
                            alert("录入失败！")
                        }
                    },
                    error: function (jqXHR) {
                        alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                    }
                });
            }
        } else {
            alert("请您先登录！")
        }
    });

    //验证证书编号是否存在
    $("#zsbh1").blur(function () {
        if ($("#zsbh1").val() == "") {
            $("#zsbhyanzheng").text("不能为空！");
            $("#zsbhyanzheng").css("color", "#FF0000");
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_verifyInspectionDeviceZSBH.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "zsbh": $("#zsbh1").val()
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data.jsonObject == "0") {
                        $("#zsbhyanzheng").text("验证通过！");
                        $("#zsbhyanzheng").css("color", "#008000");
                        $("#submit1").attr('disabled', false);
                    } else if (data.jsonObject == "1") {
                        $("#zsbhyanzheng").text("已被使用！");
                        $("#zsbhyanzheng").css("color", "#FF0000");
                    }
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        }
    });
    /**
     * part1 送检仪器录入  结束
     */

    //*********************************************************************************************************

    /**
     * part2 送检仪器查询  开始
     */
    //当鼠标悬浮在某一行上时点亮背景part2
    $('#list2').delegate("tr", "mouseover mouseout", function (e) {
        if (e.type == 'mouseover') {
            $(this).css("background", "#f5f5f0");
        }
        else if (e.type == 'mouseout') {
            $(this).css("background", "#fff");
        }
    });
    //当鼠标悬浮在某一行上时点亮背景part4
    $('#list4').delegate("tr", "mouseover mouseout", function (e) {
        if (e.type == 'mouseover') {
            $(this).css("background", "#f5f5f0");
        }
        else if (e.type == 'mouseout') {
            $(this).css("background", "#fff");
        }
    });
    //当鼠标悬浮在某一行上时点亮背景part5
    $('#list5_1').delegate("tr", "mouseover mouseout", function (e) {
        if (e.type == 'mouseover') {
            $(this).css("background", "#f5f5f0");
        }
        else if (e.type == 'mouseout') {
            $(this).css("background", "#fff");
        }
    });
    //当鼠标悬浮在某一行上时点亮背景part6
    $('#list6_1').delegate("tr", "mouseover mouseout", function (e) {
        if (e.type == 'mouseover') {
            $(this).css("background", "#f5f5f0");
        }
        else if (e.type == 'mouseout') {
            $(this).css("background", "#fff");
        }
    });
    //查询所有送检仪器信息 ---送检仪器信息查询
    $("#songjiancx").click(function () {
            //if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDevice.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td>' + data.allJsonArray[i].leixing + '</td>'
                            + '<td>' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td>' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td>' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td>' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="修改"/>'
                            + '&nbsp;<input class="list_title" type="submit" value="删除"/></td></tr>';
                    }
                    $("#list2").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
            //} else {
            //    alert("请您先登录！")
            //}
        }
    );

    //修改和删除送检仪器一条信息
    $("#list2").on("click", "input", function () {
        if ($(this).val() == "修改") {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findOneInspectionDevice.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "id": $(this).parents("tr").find(".zsbh").text()
                },
                dataType: "json",
                cache: false,
                success: function (data) {

                    $("#leixing1_1").html(data.allJsonArray[0].leixing);
                    $("input[id='xinghao1_1']").val(data.allJsonArray[0].xinghao);
                    $("input[id='yqmc1_1']").val(data.allJsonArray[0].yqmc);
                    $("input[id='yqbh1_1']").val(data.allJsonArray[0].yqbh);
                    $("input[id='sjdw1_1']").val(data.allJsonArray[0].sjdw);
                    $("input[id='zqddj1_1']").val(data.allJsonArray[0].zqddj);
                    $("input[id='clfw1_1']").val(data.allJsonArray[0].clfw);
                    $("input[id='sccj1_1']").val(data.allJsonArray[0].sccj);
                    $("input[id='jddd1_1']").val(data.allJsonArray[0].jddd);
                    $("input[id='wendu1_1']").val(data.allJsonArray[0].wendu);
                    $("input[id='shidu1_1']").val(data.allJsonArray[0].shidu);
                    $("input[id='jdsj1_1']").val(formatdatetime2(data.allJsonArray[0].jdsj));
                    $("input[id='yxqsj1_1']").val(formatdatetime2(data.allJsonArray[0].yxqsj));
                    $("input[id='jdyj1_1']").val(data.allJsonArray[0].jdyj);
                    $("#zsbh1_1").html(data.allJsonArray[0].zsbh);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
            $(document).scrollTop(250);
        }
        else if ($(this).val() == "删除") {
            var se = confirm("确认要删除证书编号：" + $(this).parents("tr").find(".zsbh").text() + "的记录吗？");
            if (se == true) {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/ResistanceProject/Action_deleteInspectionDevice.action",
                    async: false,
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    data: {
                        "title": $(this).parents("tr").find(".zsbh").text()//获取按钮所在行class为zsbh的元素的值,$(this).parents("tr")获取按钮所在行
                    },
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        //alert(data.jsonObject);
                        findAllInspectionDeviceAgain();
                    },
                    error: function (jqXHR) {
                        alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                    }
                });
            }
            else {
                //取消
            }
        }
    });

    //修改一条送检仪器信息后，确认提交
    $("#submit1_1").click(function () {
        if ($("#zsbh1_1").text() == "") {
            alert("请选择一条数据进行修改！")
        }
        else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_modifyInspectionDevice.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "leixing": $("#leixing1_1").text(),
                    "xinghao": $("#xinghao1_1").val(),
                    "yqmc": $("#yqmc1_1").val(),
                    "yqbh": $("#yqbh1_1").val(),
                    "sjdw": $("#sjdw1_1").val(),
                    "zqddj": $("#zqddj1_1").val(),
                    "clfw": $("#clfw1_1").val(),
                    "sccj": $("#sccj1_1").val(),
                    "jddd": $("#jddd1_1").val(),
                    "wendu": $("#wendu1_1").val(),
                    "shidu": $("#shidu1_1").val(),
                    "jdsj": $("#jdsj1_1").val(),
                    "yxqsj": $("#yxqsj1_1").val(),
                    "jdyj": $("#jdyj1_1").val(),
                    "zsbh": $("#zsbh1_1").text()
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data.jsonObject == "1") {
                        alert("证书编号：" + $("#zsbh1_1").text() + "的证书修改成功！");
                        findAllInspectionDeviceAgain();
                        $("input[name='sjyqxxxg']").val(""); // 将name=sjyqxxlr的文本框清空，以便重新输入
                        $("#leixing1_1").html("");
                        $("#zsbh1_1").html("");
                    } else {
                        alert("修改失败！")
                    }
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        }
    });

    //删除一条送检仪器信息后刷新页面，加载用的函数
    function findAllInspectionDeviceAgain() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDevice.action",
            async: false,//嵌套时最好加上这个，不然容易出问题，外层的应该无所谓，内层一定要加
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html;
                for (var i = 0; i < data.allJsonArray.length; i++) {
                    html += '<tr><td>' + (i + 1) + '</td>'
                        + '<td>' + data.allJsonArray[i].leixing + '</td>'
                        + '<td>' + data.allJsonArray[i].xinghao + '</td>'
                        + '<td>' + data.allJsonArray[i].yqmc + '</td>'
                        + '<td>' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                        + '<td>' + data.allJsonArray[i].sjdw + '</td>'
                        + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                        + '<td><input class="list_title" type="submit" value="修改"/>'
                        + '&nbsp;<input class="list_title" type="submit" value="删除"/></td></tr>';
                }
                $("#list2").html(html);
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        })
    }

    //按类型顺序，查询所有送检仪器信息1
    $("#leixingorder").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "leixing"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td>' + data.allJsonArray[i].leixing + '</td>'
                            + '<td>' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td>' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td>' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td>' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="修改"/>'
                            + '&nbsp;<input class="list_title" type="submit" value="删除"/></td></tr>';
                    }
                    $("#list2").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按型号顺序，查询所有送检仪器信息2
    $("#xinghaoorder").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "xinghao"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td>' + data.allJsonArray[i].leixing + '</td>'
                            + '<td>' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td>' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td>' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td>' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="修改"/>'
                            + '&nbsp;<input class="list_title" type="submit" value="删除"/></td></tr>';
                    }
                    $("#list2").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按仪器名称顺序，查询所有送检仪器信息3
    $("#yqmcorder").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "yqmc"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td>' + data.allJsonArray[i].leixing + '</td>'
                            + '<td>' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td>' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td>' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td>' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="修改"/>'
                            + '&nbsp;<input class="list_title" type="submit" value="删除"/></td></tr>';
                    }
                    $("#list2").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按仪器编号顺序，查询所有送检仪器信息4
    $("#jdsjorder").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "jdsj"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td>' + data.allJsonArray[i].leixing + '</td>'
                            + '<td>' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td>' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td>' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td>' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="修改"/>'
                            + '&nbsp;<input class="list_title" type="submit" value="删除"/></td></tr>';
                    }
                    $("#list2").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按送检单位顺序，查询所有送检仪器信息5
    $("#sjdworder").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "sjdw"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td>' + data.allJsonArray[i].leixing + '</td>'
                            + '<td>' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td>' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td>' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td>' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="修改"/>'
                            + '&nbsp;<input class="list_title" type="submit" value="删除"/></td></tr>';
                    }
                    $("#list2").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按证书编号顺序，查询所有送检仪器信息6
    $("#zsbhorder").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "zsbh"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td>' + data.allJsonArray[i].leixing + '</td>'
                            + '<td>' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td>' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td>' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td>' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="修改"/>'
                            + '&nbsp;<input class="list_title" type="submit" value="删除"/></td></tr>';
                    }
                    $("#list2").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });
    /**
     * part2 送检仪器查询  结束
     */
    //*********************************************************************************************************
    /**
     * part3 标准器录入  开始
     */
    //初始化时间窗口
    $("#biaozhun").click(function () {
        $("#yxqz3").val(new Date().format("yyyy-MM-dd"));
    });
    //标准器信息录入
    $("#submit3").click(function () {
        if ($.session.get("username") != null) {
            if ($("#xinghao3_1").val() == "") {
                alert("标准器型号不可为空！")
            } else {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/ResistanceProject/Action_addStandardDevice.action",
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    data: {
                        "leixing": $("#leixing3 option:selected").val(),
                        "xinghao": $("#xinghao3").val(),
                        "mingchen": $("#mingchen3").val(),
                        "yqbh": $("#yqbh3").val(),
                        "bqdd": $("#bqdd3").val(),
                        "jlbzzsh": $("#jlbzzsh3").val(),
                        "yxqz": $("#yxqz3").val()
                    },
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        if (data.jsonObject == "录入成功！") {
                            alert("录入成功！");
                            $("input[name='bzqxxlr']").val(""); // 将name=bzqxxlr的文本框清空，以便重新输入
                            $("#yxqz3").val(new Date().format("yyyy-MM-dd"));
                        } else {
                            alert("录入失败！")
                        }
                    },
                    error: function (jqXHR) {
                        alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                    }
                });
            }
        } else {
            alert("请您先登录！")
        }
    });
    /**
     * part3 标准器录入  结束
     */

    //*********************************************************************************************************
    /**
     * part4 标准器查询  开始
     */
    //查询所有标准器信息
    $("#biaozhuncx").click(function () {
        //if ($.session.get("username") != null) {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_findAllStandardDevice.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html;
                for (var i = 0; i < data.allJsonArray.length; i++) {
                    html += '<tr><td class="lx">' + data.allJsonArray[i].lx + '</td>'
                        + '<td class="xh">' + data.allJsonArray[i].xh + '</td>'
                        + '<td class="mc">' + data.allJsonArray[i].mc + '</td>'
                        + '<td class="yqbh">' + data.allJsonArray[i].yqbh + '</td>'
                        + '<td class="bqdd">' + data.allJsonArray[i].bqdd + '</td>'
                        + '<td class="jlbzzsh">' + data.allJsonArray[i].jlbzzsh + '</td>'
                        + '<td class="yxqz">' + formatdatetime(data.allJsonArray[i].yxqz) + '</td>'
                        + '<td><input class="list_title" type="submit" value="修改"/>'
                        + '&nbsp;<input class="list_title" type="submit" value="删除"/></td></tr>';
                }
                $("#list4").html(html);
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
        //} else {
        //    alert("请您先登录！")
        //}
    });

    //修改和删除标准器一条信息
    $("#list4").on("click", "input", function () {
        if ($(this).val() == "修改") {
            $("#leixing3_1").html($(this).parents("tr").find(".lx").text());
            $("#xinghao3_1").html($(this).parents("tr").find(".xh").text());
            $("input[id='mingchen3_1']").val($(this).parents("tr").find(".mc").text());
            $("input[id='yqbh3_1']").val($(this).parents("tr").find(".yqbh").text());
            $("input[id='bqdd3_1']").val($(this).parents("tr").find(".bqdd").text());
            $("input[id='jlbzzsh3_1']").val($(this).parents("tr").find(".jlbzzsh").text());
            $("input[id='yxqz3_1']").val(formatdatetime1($(this).parents("tr").find(".yxqz").text()));
        }
        else if ($(this).val() == "删除") {
            var se = confirm("确认要删除此记录吗？");
            if (se == true) {
                $.ajax({
                    type: "POST",
                    url: "http://localhost:8080/ResistanceProject/Action_deleteStandardDevice.action",
                    async: false,
                    contentType: "application/x-www-form-urlencoded; charset=utf-8",
                    data: {
                        "title": $(this).parents("tr").find(".xh").text()//获取按钮所在行class为yqbh的元素的值,$(this).parents("tr")获取按钮所在行
                    },
                    dataType: "json",
                    cache: false,
                    success: function (data1) {
                        //alert(data1.jsonObject);
                        findAllStandardDeviceAgain();
                    },
                    error: function (jqXHR) {
                        alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                    }
                });
            }
            else {
                //取消
            }
        }
    });

    //修改一行标准器信息后，确认提交
    $("#submit4").click(function () {
        if ($("#xinghao3_1").text() == "") {
            alert("请选择一条数据进行修改！")
        }
        else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_modifyStandardDevice.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "leixing": $("#leixing3_1").text(),
                    "xinghao": $("#xinghao3_1").text(),
                    "mingchen": $("#mingchen3_1").val(),
                    "yqbh": $("#yqbh3_1").val(),
                    "bqdd": $("#bqdd3_1").val(),
                    "jlbzzsh": $("#jlbzzsh3_1").val(),
                    "yxqz": $("#yxqz3_1").val()
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data.jsonObject == "1") {
                        alert($("#xinghao3_1").text() + "型号的标准器修改成功！");
                        findAllStandardDeviceAgain();
                        $("input[name='bzqxxmodify']").val(""); // 将name=bzqxxmodify的文本框清空，以便重新下一次修改
                        $("#leixing3_1").html("");
                        $("#xinghao3_1").html("");
                    } else {
                        alert("修改失败！")
                    }
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            })
        }
    });

    //删除标准器一条标准器信息后刷新页面，加载用的函数
    function findAllStandardDeviceAgain() {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_findAllStandardDevice.action",
            async: false,//嵌套时最好加上这个，不然容易出问题，外层的应该无所谓，内层一定要加
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html;
                for (var i = 0; i < data.allJsonArray.length; i++) {
                    html += '<tr><td class="lx">' + data.allJsonArray[i].lx + '</td>'
                        + '<td class="xh">' + data.allJsonArray[i].xh + '</td>'
                        + '<td class="mc">' + data.allJsonArray[i].mc + '</td>'
                        + '<td class="yqbh">' + data.allJsonArray[i].yqbh + '</td>'
                        + '<td class="bqdd">' + data.allJsonArray[i].bqdd + '</td>'
                        + '<td class="jlbzzsh">' + data.allJsonArray[i].jlbzzsh + '</td>'
                        + '<td class="yxqz">' + formatdatetime(data.allJsonArray[i].yxqz) + '</td>'
                        + '<td><input class="list_title" type="submit" value="修改"/>'
                        + '&nbsp;<input class="list_title" type="submit" value="删除"/></td></tr>';
                }
                $("#list4").html(html);
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        })
    }

    /**
     * part4 标准器查询  结束
     */

    //*********************************************************************************************************

    /**
     * part5 采样检测  开始
     */
    //隐藏或显示选择区   part5
    $("#submit5_0_0").click(function () {
        if ($("input[id='submit5_0_0']").val() == "隐藏选择区") {
            $("#part5_1").hide(speed_value);
            $("input[id='submit5_0_0']").val("显示选择区");
        } else if ($("input[id='submit5_0_0']").val() == "显示选择区") {
            $("#part5_1").show(speed_value);
            $("input[id='submit5_0_0']").val("隐藏选择区");
        }
    });

    //查询所有送检仪器和标准器信息 ----电阻表采样检测   part5
    $("#dzbcyjc").click(function () {
        //if ($.session.get("username") != null) {
        //查询所有送检仪器信息
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDevice.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html;
                for (var i = 0; i < data.allJsonArray.length; i++) {
                    html += '<tr><td>' + (i + 1) + '</td>'
                        + '<td class="leixing">' + data.allJsonArray[i].leixing + '</td>'
                        + '<td class="xinghao">' + data.allJsonArray[i].xinghao + '</td>'
                        + '<td class="yqmc">' + data.allJsonArray[i].yqmc + '</td>'
                        + '<td class="jdsj">' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                        + '<td class="sjdw">' + data.allJsonArray[i].sjdw + '</td>'
                        + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                        + '<td><input class="list_title" type="submit" value="选择"/></td></tr>';
                }
                $("#list5_1").html(html);
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
        //} else {
        //    alert("请您先登录！")
        //}
    });

    //按类型顺序，查询所有送检仪器信息 ---电阻表采样检测   part5  select1
    $("#leixingorder5").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "leixing"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td class="leixing">' + data.allJsonArray[i].leixing + '</td>'
                            + '<td class="xinghao">' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td class="yqmc">' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td class="jdsj">' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td class="sjdw">' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="选择"/></td></tr>';
                    }
                    $("#list5_1").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按型号顺序，查询所有送检仪器信息  ---电阻表采样检测   part5  select2
    $("#xinghaoorder5").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "xinghao"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td class="leixing">' + data.allJsonArray[i].leixing + '</td>'
                            + '<td class="xinghao">' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td class="yqmc">' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td class="jdsj">' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td class="sjdw">' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="选择"/></td></tr>';
                    }
                    $("#list5_1").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按仪器名称顺序，查询所有送检仪器信息  ---电阻表采样检测   part5  select3
    $("#yqmcorder5").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "yqmc"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td class="leixing">' + data.allJsonArray[i].leixing + '</td>'
                            + '<td class="xinghao">' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td class="yqmc">' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td class="jdsj">' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td class="sjdw">' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="选择"/></td></tr>';
                    }
                    $("#list5_1").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按仪器编号顺序，查询所有送检仪器信息  ---电阻表采样检测   part5  select4
    $("#jdsjorder5").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "jdsj"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td class="leixing">' + data.allJsonArray[i].leixing + '</td>'
                            + '<td class="xinghao">' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td class="yqmc">' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td class="jdsj">' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td class="sjdw">' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="选择"/></td></tr>';
                    }
                    $("#list5_1").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按送检单位顺序，查询所有送检仪器信息  ---电阻表采样检测   part5  select5
    $("#sjdworder5").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "sjdw"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td class="leixing">' + data.allJsonArray[i].leixing + '</td>'
                            + '<td class="xinghao">' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td class="yqmc">' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td class="jdsj">' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td class="sjdw">' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="选择"/></td></tr>';
                    }
                    $("#list5_1").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按证书编号顺序，查询所有送检仪器信息  ---电阻表采样检测   part5  select6
    $("#zsbhorder5").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "zsbh"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td class="leixing">' + data.allJsonArray[i].leixing + '</td>'
                            + '<td class="xinghao">' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td class="yqmc">' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td class="jdsj">' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td class="sjdw">' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="选择"/></td></tr>';
                    }
                    $("#list5_1").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //选择一条送检仪器信息 part5
    $("#list5_1").on("click", "input", function () {
        $("#leixing5_1").html($(this).parents("tr").find(".leixing").text());
        $("#xinghao5_1").html($(this).parents("tr").find(".xinghao").text());
        $("#yqmc5_1").html($(this).parents("tr").find(".yqmc").text());
        $("#jdsj5_1").html($(this).parents("tr").find(".jdsj").text());
        $("#sjdw5_1").html($(this).parents("tr").find(".sjdw").text());
        $("#zsbh5_1").html($(this).parents("tr").find(".zsbh").text());
        //$("#submit5_0_1").attr('disabled', false);
        $("#part5_2").html("");
        $("#part5_1").hide(speed_value);
        $("#part5_4").show();
        $("input[id='submit5_0_0']").val("显示选择区");
    });

    //列举端口，检测可用端口 part5
    $("#submit5_1_0").click(function () {
        if ($("#leixing5_1").text() == "" || $("#zsbh5_1").text() == "") {
            alert("请先选择一条待检测的送检仪器！")
        } else {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_listPorts.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                dataType: "json",
                cache: false,
                success: function (data) {
                    if (data.allJsonArray.length > 0) {
                        var html;
                        for (var i = 0; i < data.allJsonArray.length; i++) {
                            html += '<option value="' + data.allJsonArray[i].port + '">' + data.allJsonArray[i].port + '</option>';
                        }
                        $("#submit5_1_1").html(html);
                        $("#submit5_1_2").attr('disabled', false);
                    } else {
                        alert("暂时没有可用端口！");
                    }
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        }
    });

    //打开指定端口 part5
    $("#submit5_1_2").click(function () {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_openPort.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                "port": $("#submit5_1_1 option:selected").val()
            },
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.jsonObject == "1") {  //“1”代表成功打开
                    $("#part5_3").html("端口" + $("#submit5_1_1 option:selected").val() + "开启成功");
                    $("#submit5_1_2").attr('disabled', true);
                    $("#submit5_1_2_0").attr('disabled', false);
                    $("#submit5_1_3").attr('disabled', false);
                } else {
                    alert("端口打开失败！");
                }
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    });

    //发送密码 part5
    $("#submit5_1_2_0").click(function () {
        $("#part5_2").html("，仪器连接中，请稍等......");
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_sendData.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.jsonObject == "0") {
                    $("#part5_2").html("");
                    alert("密码发送失败,请检查线路连通性后再发送一次！");
                }
                else if (data.jsonObject == "1") $("#part5_2").html(",连接下位机成功，可以传输数据了！");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    });

    //关闭端口 part5
    $("#submit5_1_3").click(function () {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_closePort.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
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
    });

    /**
     * part5 采样检测  结束
     */

    //*********************************************************************************************************
    /**
     * part6 证书处理部分 开始
     */
    //隐藏或显示选择区   part6
    $("#submit6_0_0").click(function () {
        if ($("input[id='submit6_0_0']").val() == "隐藏选择区") {
            $("#part6_1").hide(speed_value);
            $("input[id='submit6_0_0']").val("显示选择区");
        } else if ($("input[id='submit6_0_0']").val() == "显示选择区") {
            $("#part6_1").show(speed_value);
            $("input[id='submit6_0_0']").val("隐藏选择区");
        }
    });
    //打开证书所在目录
    $("#openlocaldisk").click(function () {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/ResistanceProject/Action_openLocalDisk.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    });
    //查询所有送检仪器 part6
    $("#zhengshu").click(function () {
        //if ($.session.get("username") != null) {
        //查询所有送检仪器信息
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDevice.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            dataType: "json",
            cache: false,
            success: function (data) {
                var html;
                for (var i = 0; i < data.allJsonArray.length; i++) {
                    html += '<tr><td>' + (i + 1) + '</td>'
                        + '<td class="leixing">' + data.allJsonArray[i].leixing + '</td>'
                        + '<td class="xinghao">' + data.allJsonArray[i].xinghao + '</td>'
                        + '<td class="yqmc">' + data.allJsonArray[i].yqmc + '</td>'
                        + '<td class="jdsj">' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                        + '<td class="sjdw">' + data.allJsonArray[i].sjdw + '</td>'
                        + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                        + '<td><input class="list_title" type="submit" value="选择"/></td></tr>';
                }
                $("#list6_1").html(html);
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
        //} else {
        //    alert("请您先登录！")
        //}
    });

    //按类型顺序，查询所有送检仪器信息 ---电阻表采样检测   part5  select1
    $("#leixingorder6").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "leixing"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td class="leixing">' + data.allJsonArray[i].leixing + '</td>'
                            + '<td class="xinghao">' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td class="yqmc">' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td class="jdsj">' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td class="sjdw">' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="选择"/></td></tr>';
                    }
                    $("#list6_1").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按型号顺序，查询所有送检仪器信息  ---电阻表采样检测   part6  select2
    $("#xinghaoorder6").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "xinghao"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td class="leixing">' + data.allJsonArray[i].leixing + '</td>'
                            + '<td class="xinghao">' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td class="yqmc">' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td class="jdsj">' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td class="sjdw">' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="选择"/></td></tr>';
                    }
                    $("#list6_1").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按仪器名称顺序，查询所有送检仪器信息  ---电阻表采样检测   part6  select3
    $("#yqmcorder6").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "yqmc"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td class="leixing">' + data.allJsonArray[i].leixing + '</td>'
                            + '<td class="xinghao">' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td class="yqmc">' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td class="jdsj">' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td class="sjdw">' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="选择"/></td></tr>';
                    }
                    $("#list6_1").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按仪器编号顺序，查询所有送检仪器信息  ---电阻表采样检测   part6  select4
    $("#jdsjorder6").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "jdsj"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td class="leixing">' + data.allJsonArray[i].leixing + '</td>'
                            + '<td class="xinghao">' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td class="yqmc">' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td class="jdsj">' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td class="sjdw">' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="选择"/></td></tr>';
                    }
                    $("#list6_1").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按送检单位顺序，查询所有送检仪器信息  ---电阻表采样检测   part6  select5
    $("#sjdworder6").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "sjdw"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td class="leixing">' + data.allJsonArray[i].leixing + '</td>'
                            + '<td class="xinghao">' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td class="yqmc">' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td class="jdsj">' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td class="sjdw">' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="选择"/></td></tr>';
                    }
                    $("#list6_1").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //按证书编号顺序，查询所有送检仪器信息  ---电阻表采样检测   part6  select6
    $("#zsbhorder6").click(function () {
        if ($.session.get("username") != null) {
            $.ajax({
                type: "POST",
                url: "http://localhost:8080/ResistanceProject/Action_findAllInspectionDeviceByOrder.action",
                contentType: "application/x-www-form-urlencoded; charset=utf-8",
                data: {
                    "order": "zsbh"
                },
                dataType: "json",
                cache: false,
                success: function (data) {
                    var html;
                    for (var i = 0; i < data.allJsonArray.length; i++) {
                        html += '<tr><td>' + (i + 1) + '</td>'
                            + '<td class="leixing">' + data.allJsonArray[i].leixing + '</td>'
                            + '<td class="xinghao">' + data.allJsonArray[i].xinghao + '</td>'
                            + '<td class="yqmc">' + data.allJsonArray[i].yqmc + '</td>'
                            + '<td class="jdsj">' + formatdatetime(data.allJsonArray[i].jdsj) + '</td>'
                            + '<td class="sjdw">' + data.allJsonArray[i].sjdw + '</td>'
                            + '<td class="zsbh">' + data.allJsonArray[i].zsbh + '</td>'
                            + '<td><input class="list_title" type="submit" value="选择"/></td></tr>';
                    }
                    $("#list6_1").html(html);
                },
                error: function (jqXHR) {
                    alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
                }
            });
        } else {
            alert("请您先登录！")
        }
    });

    //选择一条送检仪器信息 part6
    $("#list6_1").on("click", "input", function () {
        $("#leixing6_1").html($(this).parents("tr").find(".leixing").text());
        $("#xinghao6_1").html($(this).parents("tr").find(".xinghao").text());
        $("#yqmc6_1").html($(this).parents("tr").find(".yqmc").text());
        $("#jdsj6_1").html($(this).parents("tr").find(".jdsj").text());
        $("#sjdw6_1").html($(this).parents("tr").find(".sjdw").text());
        $("#zsbh6_1").html($(this).parents("tr").find(".zsbh").text());
        if ($(this).parents("tr").find(".leixing").text() == "绝缘电阻表") {
            $("#submit6_0_1").attr("disabled", false);
            $("#submit6_0_2").attr("disabled", false);
            $("#submit6_0_3").attr("disabled", "disabled");
            $("#submit6_0_4").attr("disabled", "disabled");
        } else if ($("#leixing6_1").text() == "接地电阻表") {
            $("#submit6_0_1").attr("disabled", "disabled");
            $("#submit6_0_2").attr("disabled", "disabled");
            $("#submit6_0_3").attr("disabled", false);
            $("#submit6_0_4").attr("disabled", false);
        }
        $("#part6_1").hide(speed_value);
        $("#submit6_0_0").val("显示选择区");
        $("#part6_2").hide();
        $("#part6_3").hide();
        $("#part6_4").hide();
        $("#part6_5").hide();
        clearprocessbar();
        $("#part6_6").hide();
    });

    //显示绝缘电阻表原始记录证书1
    $("#submit6_0_1").click(function () {
        if ($("#submit6_0_0").val() == "隐藏选择区") {
            $("#part6_1").hide(speed_value);
            $("#submit6_0_0").val("显示选择区");
        }
        $("#part6_2").show();
        $("#part6_3").hide();
        $("#part6_4").hide();
        $("#part6_5").hide();
        //初始化值
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_findOneInspectionDevice.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                "id": $("#zsbh6_1").text()//送检仪器证书编号
            },
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#wg1").val(data.allJsonArray[0].wg);
                $("#jydz1").val(data.allJsonArray[0].jydz);
                $("#jyqd1").val(data.allJsonArray[0].jyqd);
                $("#xsnl1").val(data.allJsonArray[0].xsnl);
                $("#klcldy1").val(data.allJsonArray[0].klcldy);
                $("#dldy1").val(data.allJsonArray[0].dldy);
                $("#dndywdx1").val(data.allJsonArray[0].dndywdx);
                $("#qxyyjy1").val(data.allJsonArray[0].qxyyjy)
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });

    });
    //显示绝缘电阻表检定证书记录2
    $("#submit6_0_2").click(function () {
        if ($("#submit6_0_0").val() == "隐藏选择区") {
            $("#part6_1").hide(speed_value);
            $("#submit6_0_0").val("显示选择区");
        }
        $("#part6_2").hide();
        $("#part6_3").show();
        $("#part6_4").hide();
        $("#part6_5").hide();
        //初始化值
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_findOneInspectionDevice.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                "id": $("#zsbh6_1").text()//送检仪器证书编号
            },
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#wg2").val(data.allJsonArray[0].wg);
                $("#jydz2").val(data.allJsonArray[0].jydz);
                $("#jyqd2").val(data.allJsonArray[0].jyqd);
                $("#xsnl2").val(data.allJsonArray[0].xsnl);
                $("#klcldy2").val(data.allJsonArray[0].klcldy);
                $("#dldy2").val(data.allJsonArray[0].dldy);
                $("#dndywdx2").val(data.allJsonArray[0].dndywdx);
                $("#qxyyjy2").val(data.allJsonArray[0].qxyyjy);
                $("#jdjl2").val(data.allJsonArray[0].jdjl)
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    });
    //显示接地电阻表原始记录证书3
    $("#submit6_0_3").click(function () {
        if ($("#submit6_0_0").val() == "隐藏选择区") {
            $("#part6_1").hide(speed_value);
            $("#submit6_0_0").val("显示选择区");
        }
        $("#part6_2").hide();
        $("#part6_3").hide();
        $("#part6_4").show();
        $("#part6_5").hide();

        //初始化值
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_findOneInspectionDevice.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                "id": $("#zsbh6_1").text()//送检仪器证书编号
            },
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#wg3").val(data.allJsonArray[0].wg);
                $("#jydz3").val(data.allJsonArray[0].jydz);
                $("#jyqd3").val(data.allJsonArray[0].jyqd);
                $("#tdjc3").val(data.allJsonArray[0].tdjc);
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    });
    //显示接地电阻表检定证书记录4
    $("#submit6_0_4").click(function () {
        if ($("#submit6_0_0").val() == "隐藏选择区") {
            $("#part6_1").hide(speed_value);
            $("#submit6_0_0").val("显示选择区");
        }
        $("#part6_2").hide();
        $("#part6_3").hide();
        $("#part6_4").hide();
        $("#part6_5").show();

        //初始化值
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_findOneInspectionDevice.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                "id": $("#zsbh6_1").text()//送检仪器证书编号
            },
            dataType: "json",
            cache: false,
            success: function (data) {
                $("#wg4").val(data.allJsonArray[0].wg);
                $("#jydz4").val(data.allJsonArray[0].jydz);
                $("#jyqd4").val(data.allJsonArray[0].jyqd);
                $("#tdjc4").val(data.allJsonArray[0].tdjc);
                $("#wzyxsy4").val(data.allJsonArray[0].wzyxsy);
                $("#fzjddzyxsy4").val(data.allJsonArray[0].fzjddzyxsy);
                $("#jdjl4").val(data.allJsonArray[0].jdjl);
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    });

    //生成绝缘电阻表原始记录证书1
    $("#submit6_2_1").click(function () {
        //显示进度条
        clearprocessbar();
        $("#part6_6").show();
        mytimer = setInterval(processbar, speed_bar);
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_createJYOriginal.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                "zsbh": $("#zsbh6_1").text(),//送检仪器证书编号
                "value1": $("#wg1").val(),
                "value2": $("#jydz1").val(),
                "value3": $("#jyqd1").val(),
                "value4": $("#xsnl1").val(),
                "value5": $("#klcldy1").val(),
                "value6": $("#dldy1").val(),
                "value7": $("#dndywdx1").val(),
                "value8": $("#qxyyjy1").val()
                //"value":$("#").val(),
            },
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.jsonObject == "1") {
                    clearInterval(mytimer);
                    $("#processbar").css('width', "1000px");
                    $("#span_s").html(100);
                } else alert("证书生成失败，请重新生成！");
                //alert("证书已生成，请点击“打开证书目录”查看证书！");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    });

    //生成绝缘电阻表检定证书记录2
    $("#submit6_2_2").click(function () {
        //显示进度条
        clearprocessbar();
        $("#part6_6").show();
        mytimer = setInterval(processbar, speed_bar);
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_createJYCertificate.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                "zsbh": $("#zsbh6_1").text(),//送检仪器证书编号
                "value1": $("#wg2").val(),
                "value2": $("#jydz2").val(),
                "value3": $("#jyqd2").val(),
                "value4": $("#xsnl2").val(),
                "value5": $("#klcldy2").val(),
                "value6": $("#dldy2").val(),
                "value7": $("#dndywdx2").val(),
                "value8": $("#qxyyjy2").val(),
                "value9": $("#jdjl2").val()
            },
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.jsonObject == "1") {
                    clearInterval(mytimer);
                    $("#processbar").css('width', "1000px");
                    $("#span_s").html(100);
                } else alert("证书生成失败，请重新生成！");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    });

    //生成接地电阻表原始记录证书3
    $("#submit6_2_3").click(function () {
        //显示进度条
        clearprocessbar();
        $("#part6_6").show();
        mytimer = setInterval(processbar, speed_bar);
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_createJDOriginal.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                "zsbh": $("#zsbh6_1").text(),//送检仪器证书编号
                "value1": $("#wg3").val(),
                "value2": $("#jydz3").val(),
                "value3": $("#jyqd3").val(),
                "value4": $("#tdjc3").val()
            },
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.jsonObject == "1") {
                    clearInterval(mytimer);
                    $("#processbar").css('width', "1000px");
                    $("#span_s").html(100);
                } else alert("证书生成失败，请重新生成！");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    });

    //生成接地电阻表检定证书记录4
    $("#submit6_2_4").click(function () {
        //显示进度条
        clearprocessbar();
        $("#part6_6").show();
        mytimer = setInterval(processbar, speed_bar);
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/ResistanceProject/Action_createJDCertificate.action",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            data: {
                "zsbh": $("#zsbh6_1").text(),//送检仪器证书编号
                "value1": $("#wg4").val(),
                "value2": $("#jydz4").val(),
                "value3": $("#jyqd4").val(),
                "value4": $("#tdjc4").val(),
                "value5": $("#wzyxsy4").val(),
                "value6": $("#fzjddzyxsy4").val(),
                "value7": $("#jdjl4").val()
            },
            dataType: "json",
            cache: false,
            success: function (data) {
                if (data.jsonObject == "1") {
                    clearInterval(mytimer);
                    $("#processbar").css('width', "1000px");
                    $("#span_s").html(100);
                } else alert("证书生成失败，请重新生成！");
            },
            error: function (jqXHR) {
                alert("发生错误代码：" + jqXHR.status + "，数据未加载成功！");
            }
        });
    });
    //进度条,开始
    var mytimer;
    var bar = 0;
    var speed_bar = 15;

    //进度条不断增加
    function processbar() {
        if (bar < 990) {
            bar = bar + 1;
            $("#processbar").css('width', bar + "px");
            $("#span_s").html(parseFloat(bar / 10).toFixed(0));
        }
    }

    //清空进度条内容和数字
    function clearprocessbar() {
        bar = 0;
        $("#processbar").css('width', "0px");
        $("#span_s").html(0);
    }

    //开始
    $("#submit6_3_1").click(function () {
        mytimer = setInterval(processbar, speed_bar);
    });
    $("#submit6_3_2").click(function () {
        clearInterval(mytimer);
    });
    //进度条,结束
    /**
     * part6 证书处理部分 结束
     */
});
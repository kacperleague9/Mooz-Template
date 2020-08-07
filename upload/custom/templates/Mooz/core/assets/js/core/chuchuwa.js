if (1 == loggedIn) {
    var countPms = 0
      , countAlerts = 0;
    function updateAlerts(e) {
        if (e.value > 0) {
            $("#button-alerts").removeClass("nada").addClass("animacion0003");
            var t = "";
            for (var i in e.alerts)
                t += '<a class="dropdown-item" href="' + URLBuild("user/alerts/?view=" + e.alerts[i].id) + '">' + e.alerts[i].content_short + "</a>";
            $("#list-alerts").html(t)
        } else
            $("#list-alerts").html('<a class="dropdown-item">' + noAlerts + "</a>");
        countAlerts = e.value
    }
    function notifyAlerts(e) {
        if (e.value > 0) {
            if (1 == e.value ? (toastr.options.onclick = function() {
                redirect(URLBuild("user/alerts"))
            }
            ,
            toastr.info(newAlert1)) : (toastr.options.onclick = function() {
                redirect(URLBuild("user/alerts"))
            }
            ,
            toastr.info(newAlertsX.replace("{x}", e.value))),
            "granted" !== Notification.permission)
                Notification.requestPermission();
            else {
                if (1 == e.value)
                    var t = new Notification(siteName,{
                        body: newAlert1
                    });
                else
                    t = new Notification(siteName,{
                        body: newAlertsX.replace("{x}", e.value)
                    });
                t.onclick = function() {
                    window.open(URLBuild("user/alerts"))
                }
            }
            countAlerts = e.value
        }
    }
    function updatePMs(e) {
        if (e.value > 0) {
            $("#button-pms").removeClass("nada").addClass("animacion0003");
            var t = "";
            for (var i in e.pms)
                t += '<a class="dropdown-item" href="' + URLBuild("user/messaging/?action=view&amp;message=" + e.pms[i].id) + '">' + e.pms[i].title + "</a>";
            $("#list-pms").html(t)
        } else
            $("#list-pms").html('<a class="dropdown-item">' + noMessages + "</a>");
        countPms = e.value
    }
    function notifyPMs(e) {
        if (e.value > 0) {
            if (1 == e.value ? (toastr.options.onclick = function() {
                redirect(URLBuild("user/messaging"))
            }
            ,
            toastr.info(newMessage1)) : (toastr.options.onclick = function() {
                redirect(URLBuild("user/messaging"))
            }
            ,
            toastr.info(newMessagesX.replace("{x}", e.value))),
            "granted" !== Notification.permission)
                Notification.requestPermission();
            else {
                if (1 == e.value)
                    var t = new Notification(siteName,{
                        body: newMessage1
                    });
                else
                    t = new Notification(siteName,{
                        body: newMessagesX.replace("{x}", e.value)
                    });
                t.onclick = function() {
                    window.open(URLBuild("user/messaging"))
                }
            }
            countPms = e.value
        }
    }
    $(document).ready(function() {
        Notification && "granted" !== Notification.permission && Notification.requestPermission(),
        $.getJSON(URLBuild("queries/alerts"), function(e) {
            updateAlerts(e)
        }),
        $.getJSON(URLBuild("queries/pms"), function(e) {
            updatePMs(e)
        }),
        window.setInterval(function() {
            $.getJSON(URLBuild("queries/alerts"), function(e) {
                countAlerts < e.value && notifyAlerts(e),
                updateAlerts(e)
            }),
            $.getJSON(URLBuild("queries/pms"), function(e) {
                countPms < e.value && notifyPMs(e),
                updatePMs(e)
            })
        }, 1e5)
    })
} else
    "1" == cookie && toastr.info(cookieNotice);
$(function() {
    var e = {};
    $("*[data-poload]").mouseenter(function() {
        var t = this;
        $.get($(t).data("poload"), function(i) {
            debugging && console.log('Limpiando Consola');
            console.clear();
            console.log('Xemah Is god');
            var o = JSON.parse(i);
            e[$(t).data("poload")] = o;
            var s = document.createElement("div");
            s.innerHTML = o.html;
            var a = s.getElementsByTagName("img")[0];
            (new Image).src = a.src
        })
    }),
    $("*[data-poload]").popup({
        hoverable: !0,
        variation: "special flowing",
        transition: 'slide down',
        html: "...",
        delay: {
            show: 500,
            hide: 200
        },
        onShow: function(t) {
            this.html(e[$(t).data("poload")].html)
        }
    })
});

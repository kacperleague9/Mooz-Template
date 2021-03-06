!function(e) {
    var n, a = '<i class="texto-grande material-icons text-danger">signal_wifi_off</i>', t = '<div class="fs-sep"></div>', i = "online", o = "charging";
    e.extend({
        failsafe: function(a) {
            var t = e.extend({}, e.failsafe.defaults, a)
              , i = function(e, n) {
                var a = document.createEvent("Event");
                a.initEvent(e, !0, !0),
                a.data = n,
                window.dispatchEvent(a)
            }
              , o = function(e, n) {
                var a;
                (a = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP")).onreadystatechange = function(e) {
                    4 == a.readyState && (200 == a.status ? i("goodconnection", {}) : i("connectionerror", {}))
                }
                ,
                a.open("GET", e + "", !0),
                a.send()
            };
            window.addEventListener("goodconnection", function(n) {
                e.failsafe.onOnline(t)
            }),
            window.addEventListener("connectionerror", function(n) {
                e.failsafe.onOffline(t)
            }),
            1 == t.checkNet && (o(t.checkUrl),
            setInterval(function() {
                o(t.checkUrl)
            }, t.checkInterval)),
            1 == t.checkBattery && (n = navigator.battery || navigator.webkitBattery || navigator.mozBattery) && (n.level <= t.chargeThreshold / 100 && !n.charging && e.failsafe.onBatteryLow(t),
            n.addEventListener("levelchange", function() {
                n.level <= t.chargeThreshold / 100 && !n.charging && e.failsafe.onBatteryLow(t)
            }),
            n.addEventListener("chargingchange", function() {
                n.charging ? e.failsafe.onCharging(t) : n.level <= t.chargeThreshold / 100 && e.failsafe.onBatteryLow(t)
            }))
        }
    }),
    e.extend(e.failsafe, {
        init: function(n) {
            e("body").prepend('<div class="variable000001" onclick="$.failsafe.putToTop();"></div><div class="fs-container" onclick="$.failsafe.putToTop();"><div class="fs-fig"></div></div>'),
            n()
        },
        onOffline: function(n) {
            "online" == i && (i = "offline",
            "batteryLow" == o ? (e(".fs-fig").append(t),
            e(".fs-fig").append(a),
            e(".fs-msg").text(n.bothDownMsg)) : e.failsafe.init(function() {
                e(".fs-fig").append(a),
                e(".fs-container").append("<div class='fs-msg'>" + n.offlineMsg + "</div>"),
                e("#intentandoxxddd").text("Intentando establecer conexicon con " + siteName),
                e(".fs-container").addClass("animacion005"),
                e(".variable000001").addClass("animacion004"),
                e.failsafe.disableElements(n)
            }))
        },
        onOnline: function(n) {
            if ("offline" == i) {
                if (i = "online",
                0 == e(".variable000001").length && 0 == e(".fs-container").length || e.failsafe.remove({
                    removeDelay: 0
                }),
                e.failsafe.init(function() {
                    e(".fs-fig").append(a),
                    e(".fs-container").append("<div class='fs-msg'>" + n.onlineMsg + "</div>"),
                    e.failsafe.remove(n)
                }),
                "batteryLow" == o)
                    return void e.failsafe.init(function() {
                        e(".fs-container").append("<div class='fs-msg'>" + n.batteryLowMsg + "</div>"),
                        e.failsafe.putToTop()
                    });
                e.failsafe.enableElements(n)
            }
        },
        onBatteryLow: function(a) {
            "charging" == o && (o = "batteryLow",
            "offline" == i ? (e(".fs-fig").append(t),
            e(".fs-fig").append(" "),
            e(".fs-msg").text(a.bothDownMsg)) : e.failsafe.init(function() {
                e(".fs-fig").append(" "),
                e(".fs-container").append("<div class='fs-msg'>" + a.batteryLowMsg + "</div>"),
                e.failsafe.disableElements(a)
            }),
            e(".battery-charge").animate({
                width: 100 * n.level + "%"
            }),
            e(".battery").attr("title", "Battery Level: " + 100 * n.level + "%"))
        },
        onCharging: function(n) {
            if ("batteryLow" == o) {
                if (o = "charging",
                0 == e(".variable000001").length && 0 == e(".fs-container").length || e.failsafe.remove({
                    removeDelay: 0
                }),
                e.failsafe.init(function() {
                    e(".fs-fig").append(" "),
                    e(".fs-container").append("<div class='fs-msg'>" + n.chargingMsg + "</div>"),
                    e.failsafe.remove(n)
                }),
                "offline" == i)
                    return void e.failsafe.init(function() {
                        e(".fs-container").append("<div class='fs-msg'>" + n.offlineMsg + "</div>"),
                        e.failsafe.putToTop()
                    });
                e.failsafe.enableElements(n)
            }
        },
        enableElements: function(n) {
            "" != n.disableElements && e(n.disableElements).removeAttr("disabled")
        },
        disableElements: function(n) {
            "" != n.disableElements && e(n.disableElements).attr("disabled", "disabled")
        },
        putToTop: function() {
            e(".fs-fig").remove(),
            e(".variable000001").animate({
                height: "60px"
            }, 1e3),
            e(".fs-container").animate({
                marginTop: "0"
            }, 1e3),
            e(".fs-container").fadeOut("100").remove(),
            e(".variable000001").fadeOut("100").remove(),
            toastr.options.timeOut = 0,
            toastr.error(CONEXION_OFF)
        },
        remove: function(n) {
            e(".variable000001").fadeOut(n.removeDelay).remove(),
            e(".fs-container").fadeOut(n.removeDelay).remove(),
            toastr.clear(),
            console.clear(),
            toastr.options.timeOut = 1500,
            toastr.success(CONEXION_ON)
        },
        defaults: {
            checkUrl: "",
            checkInterval: 1e4,
            onlineMsg: CONEXION_ON,
            offlineMsg: CONEXION_OFF,
            chargingMsg: "Your battery is now charging, carry on with your work!",
            batteryLowMsg: "Battery is quite low to continue, please plug in your laptop!",
            bothDownMsg: "Both, your network as well as battery are down!",
            chargeThreshold: 15,
            disableElements: "",
            checkNet: !0,
            checkBattery: !0,
            removeDelay: 4e3
        }
    })
}(jQuery),
$(function() {
    $.failsafe({
        checkUrl: " ",
        checkInterval: 3e4,
        disableElements: ".btn"
    })
});

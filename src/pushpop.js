$(function() {
    var App = {
        init: function() {
            this.$displayDiv = $("#showResults");
            this.$komponent  = $("input[name='komponent']");
            this.$q          = $("input[name='q']");

            App.attachFormHandler();
            App.attachPopstateHandler();

            if (App.getUrlParameter("komponent") && App.getUrlParameter("q")) {
                var urlData = App.compileUrlData();
                this.$q.val(urlData.q).focus();

                App.doSomething(urlData);
                App.pushState(urlData);
            }
        },

        attachFormHandler: function() {
            $("#sok").on("submit", function(e) {
                e.preventDefault();
                var formData = App.compileFormData(this);
                App.doSomething(formData);
                App.pushState(formData);
            });
        },

        doSomething: function(formData) {
            this.$displayDiv
                .html("komponent: " + formData.komponent + "<br>q: " + formData.q)
                .show();
        },

        pushState: function(formData) {
            var url = "?komponent=" + formData.komponent + "&q=" + formData.q;

            history.pushState(
                formData,
                "Hendelseslogg",
                url
            );
        },

        attachPopstateHandler: function() {
            $(window).on("popstate", function(e) {
                if (e.originalEvent.state) {
                    App.doSomething(e.originalEvent.state);
                }
            });
        },

        compileFormData: function(form) {
            return {
                komponent: $(form).find("input[name='komponent']").val(),
                q: $(form).find("input[name='q']").val()
            }
        },

        compileUrlData: function() {
            return {
                komponent: App.getUrlParameter("komponent"),
                q: App.getUrlParameter("q")
            }
        },

        getUrlParameter: function(sParam) {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++) {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) {
                    return sParameterName[1];
                }
            }
        }
    }

    App.init();
});
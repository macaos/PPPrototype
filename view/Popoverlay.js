define(function() {
    var ka;
    var self = {
        initialization: function(k) {
            ka = k;
        },
        // mount
        mount: function() {
            // console.log('container-modals', $('.container-modal'))
            // setTimeout(function(){
            // console.log('show popup', $('#modal-buynow'))
            self.$('.container-modal').popup({
                focusdelay: 400, // for smoother slide-in animations on Android
                outline: true,
                vertical: 'top',
                escape: false,
                blur: false,
                scrolllock: true,
                onclose: function() {
                    const popupName = $(this).closest('.container-modal').attr('id');
                    if (popupName == 'modal-buy-now') {
                        // 모든 구매중 저장 초기화 
                        ka.paypay.buyCancel();
                    } else if (popupName == 'modal-buy-complete') {
                        // 모든 구매중 저장 초기화 
                        ka.paypay.buyCancel();
                    }

                }
            });
            // $('#modal-buynow').popup('show');
            checkQuerystring();
            // },500)
            $('.container-modal .btn-close').on('click', function(e) {
                $('#' + $(this).closest('.container-modal').attr('id')).popup('hide');
            })
            $('.container-modal .btn-paypal-submit').on('click', function(e) {
                const email = $(this).closest('form').find('.email-input').val();
                const pid = $(this).closest('form').attr('pid');
                // const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
                // const emailRule = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i; //이메일 정규식
                // console.log('pattern.test(val)',pattern.test(val),val);
                if (!emailRule.test(email)) {
                    $('.container-modal .message-validation').show();
                    return false;
                }
                ka.paypay.buyStart({
                    email: email,
                    pid: pid
                });
            });
            // var smit=document.getElementById("btn-paypal-submit");
            // console.log('smit',smit)
            // smit.addEventListener("click",function(){
            //     alert('cc')
            // },false); 
            $('.container-modal .email-input').on('input', function(e) {
                $('.container-modal .message-validation').hide();
                // const val = $(this).val();
                // const emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;//이메일 정규식
                // if(!emailRule.test($("input[id='EMAIL']").val())) {            
                //     //경고
                //     return false;
                // }
            });
        },
        openModal: function(pid, popupName) {
            // console.log('openModal(', pid, popupName)
            ka.ga({
                eventAction: 'openModal#' + pid + '#' + popupName, //서브화면명 
                eventLabel: pid //이벤트명
            });
            const info = ka.getKuproductInfo(pid);
            if (pid && popupName == 'buy-now') {
                $.ajax({
                    type: 'GET',
                    url: 'https://us-central1-kareui.cloudfunctions.net/getKPID',
                    data: {},
                    dataType: 'json',
                    cache: false,
                    timeout: this.requestTimeout
                }).done(function(responseText) {
                    const json = responseText;

                    if (json.result == 'success' && json.id) {
                        ka.ga({
                            eventAction: 'API_getKPID_success',
                            eventLabel: pid //이벤트명
                        });

                        $('#modal-buy-now form').attr('pid', pid);
                        $('#modal-buy-now .dp-pid').text(pid);
                        $('#modal-buy-now .dp-price').text(info.price);
                        $('#modal-buy-now #ppid-input').attr('value', info.ppid);
                        $('#modal-buy-now').popup('show');
                        ka.paypay.openCart();
                        ka.data.KPID = json.id;
                    } else {
                        ka.ga({
                            eventAction: 'errorAPI_getKPID_fail1',
                            eventLabel: pid //이벤트명
                        });
                    }

                }).fail(function(XHR, textStatus, errorThrown) {
                    ka.ga({
                        eventAction: 'errorAPI_getKPID_fail2',
                        eventLabel: pid //이벤트명
                    });
                });

            } else if (popupName == 'buy-complete') {
                $('#modal-buy-complete').popup('show');
                ka.paypay.buyComplete();
            }

        },

        // un mount 
        unmount: function() {

        }
    };
    return self;

    function checkQuerystring() {
        const params = ka.env.parameters;
        // console.log('params', params)
        if (params) {
            if (params.status == 'pcancel') {
                self.openModal(params.pid, 'buy-now');
                // $('#modal-buy-now').popup('show');
            } else if (params.status == 'pcomplete') {
                self.openModal(params.pid, 'buy-complete');
                // $('#modal-buy-complete').popup('show');
            }
        }
    }
});
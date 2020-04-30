/*
 * kare의 확장 클래스 
 *
 * @class kare
 */

require.config({
    baseUrl: '',
    paths: {
        'jquery': './kjs/jquery-3.3.1',
        'Kareui': './kjs/Kare.ui',
        'productList': './js/productlist',
        'text': './kjs/text'
    }
});
//모듈 로드
require([
        'jquery',
        'Kareui',
        'productList'
    ],
    ($, kareui, main) => {
        require([
            './js/jquery.popupoverlay.js',
            './kjs/jquery.loading.js'
        ], () => {
            $(document).ready(() => {
                let KUID = null;
                let logCnt = localStorage.getItem('karelcnt') || 0;
                let logYMD;
                let $body = $('body');
                setKUID();


                var ka = $.extend(kareui, (function() {
                    ////////////////////////////////////////////////////////////////////////////////////////////////  
                    // ============= core area start
                    return {
                        getKuproductInfo: (ns) => {
                            var r = null;
                            $.each(kuproductList, function(i, item) {
                                if (item.publicName == ns) {
                                    r = item;
                                    return false;
                                }
                            })
                            return r;
                        },
                        getUUID: () => {
                            return 'KUxxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                                var r = Math.random() * 16 | 0,
                                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                                return v.toString(16);
                            });
                        },
                        ga: (obj) => {
                            logCnt++;
                            localStorage.setItem('karelcnt', logCnt)


                            let p = $.extend({
                                hitType: 'event', //이벤트 종류 
                                eventCategory: '', //화면명(나는 고객 아이디) 
                                eventAction: '', //서브화면명 
                                eventLabel: '' //이벤트명
                            }, obj);
                            if (!p.eventCategory || String(p.eventCategory) == 'null') p.eventCategory = KUID;
                            p.eventAction = logYMD + '#' + logCnt + '#' + p.eventAction;
                            ka.log('ga:', p);
                            // 로컬 테스트는 로그 안쌓도록 
                            if (location.host.indexOf('127.0.0.1:') != -1) return;
                            // ga('send', p.hitType, p.eventCategory, );
                            gtag(p.hitType, p.eventAction, {
                                event_category: p.eventCategory,
                                // event_category:KUID,
                                event_label: p.eventLabel
                            })
                        },
                        gaEtc: () => {

                        },
                        showLoading(selector, options) {
                            selector = selector || 'body';
                            $(selector).loading($.extend({
                                stoppable: false,
                                theme: 'dark'
                            }, options));
                        },
                        hideLoading() {
                            $('body').loading('stop');
                        },
                        paypay: {
                            openCart: () => {
                                if (storageAvailable('localStorage')) {} else {
                                    alert("Sorry! Your Browser can't use this process");
                                    return;
                                }
                                // 모든 구매중 저장 초기화 
                                ka.paypay._clearPayInfo();
                            },
                            closeCart: () => {
                                // 모든 구매중 저장 초기화 
                                ka.paypay._clearPayInfo();
                            },
                            buyStart: (options) => {
                                // console.log('t_buyStart');
                                // 구매시작 정보저장 
                                ka.paypay._savePayInfo(options);
                                ka.showLoading();
                            },
                            buyCancel: () => {

                                // 모든 구매중 저장 초기화 
                                ka.paypay._clearPayInfo();
                            },
                            buyComplete: () => {
                                // debugger;
                                ka.log(ka.paypay._isBeingUID(),
                                    ka.paypay._isPaypalReferrer(),
                                    ka.paypay._isTranAbleTime(),
                                    ka.paypay._isAbleSMM());
                                if (
                                    ka.paypay._isBeingUID() &&
                                    ka.paypay._isPaypalReferrer() &&
                                    ka.paypay._isTranAbleTime() &&
                                    ka.paypay._isAbleSMM()) {
                                    ka.paypay._SMM();
                                }
                                // 모든 구매중 저장 초기화 
                                ka.paypay._clearPayInfo();
                            },
                            _savePayInfo: (options) => {
                                let pppinfo = ka.paypay._getPPPInfo();
                                pppinfo = $.extend(pppinfo, {
                                        KPID: ka.data.KPID,
                                        KUID: ka.userID,
                                        email: options.email,
                                        uitime: ka.utils.getTimestemp(),
                                        publicName: options.pid
                                    })
                                    // console.log('t_savepppinfo pppinfo', JSON.stringify(pppinfo));
                                localStorage.setItem('pppinfo', JSON.stringify(pppinfo));
                            },
                            _getPPPInfo: () => {
                                let pppinfo = localStorage.getItem('pppinfo');
                                if (!pppinfo) pppinfo = '{}';
                                try {
                                    pppinfo = JSON.parse(pppinfo);
                                } catch (e) {
                                    pppinfo = {};
                                }
                                return pppinfo;
                            },
                            _clearPayInfo: () => {
                                ka.data.KPID = null;
                                localStorage.removeItem('pppinfo');
                            },
                            // send email
                            _SMM: () => {
                                let pppinfo = ka.paypay._getPPPInfo();
                                // console.log('tmplog_smm call ajax', pppinfo);

                                let param = {
                                        email: pppinfo.email, // user email
                                        // sendEmailTime: '20190730110940', 
                                        publicName: pppinfo.publicName, // publicName
                                        KPID: pppinfo.KPID, // 거래를 위한 unique id 
                                        // uuid: 'uuid0001',// 
                                        KUID: pppinfo.KUID, // userID 로그 등 여러가지 확인을 위한 세션ID 
                                        uitime: pppinfo.uitime // uitime 
                                            // ip:String,// userIP
                                    }
                                    // 서버에 해당 uuid로 발송한 내역확인 후 없을때 발송 
                                $.ajax({
                                    type: 'POST',
                                    // url: 'http://localhost:3000/sndmal',
                                    // url: 'https://kareui-webhook.herokuapp.com/sndmal',
                                    url: 'https://us-central1-kareui.cloudfunctions.net/sndmal',
                                    data: param,
                                    dataType: 'json',
                                    cache: false,
                                    timeout: this.requestTimeout
                                }).done(function(responseText) {
                                    // ajaxFailCount = 0; // 초기화
                                    if (option && option.callback) option.callback(responseText);
                                    ka.ga({
                                        hitType: 'event', //이벤트 종류 
                                        eventAction: 'ETCL-KNO-FATE-#' + param.email + '#' + param.publicName + '#' + param.KPID, //서브화면명 
                                        eventLabel: param.KUID //이벤트명
                                    });
                                }).fail(function(XHR, textStatus, errorThrown) {
                                    // ajaxFailCount++; // 에러 카운팅
                                });

                                // $.ajax({
                                //     type: 'POST',
                                //     url: 'https://kareui-webhook.herokuapp.com/sndmal',
                                //     data: {
                                //         email: 'macaoshu@naver.com',
                                //         publicName: 'kareui-template-04',
                                //         KPID: 'testttt',
                                //         KUID: 'uuid0001',
                                //         uitime: '0810'
                                //     },
                                //     dataType: 'text',
                                //     cache: false,
                                //     timeout: '60000'
                                // }).done(function (responseText) {
                                //     console.log(responseText);
                                // }).fail(function (XHR, textStatus, errorThrown) {

                                // });
                            },
                            // 페이팔에서 돌아왔니?
                            _isPaypalReferrer: () => {
                                return true;
                                // console.log('_isPaypalReferrer', document.referrer);

                                if (document.referrer && document.referrer.indexOf('paypal.com') > 0) return true;
                                return false;
                                // "https://www.paypal.com/webapps/hermes?token=5DB68721VD471235S&useraction=commit&rm=1&mfid=1564412528847_437d678559086"
                            },
                            // 현재 uid가 존재하는가?
                            _isBeingUID: () => {
                                let pppinfo = localStorage.getItem('pppinfo');
                                return (pppinfo) ? true : false;
                            },
                            // UUID기준 이미 발송된 이메일 내역조회 
                            _isAbleSMM: (option) => {
                                return true;
                            },
                            // buy를 누르고 pcomplete까지의 시간 
                            _isTranAbleTime: () => {
                                var gap = 0;
                                // 30분 이상 걸린경우 비정상으로 간주 
                                let pppinfo = localStorage.getItem('pppinfo');
                                if (!pppinfo) return false;
                                pppinfo = JSON.parse(pppinfo);
                                $.each(pppinfo, function(i, item) {
                                    if (i == 0) {
                                        gap = ka.utils.dateDifferent(new Date(), item.lt, 'hour');
                                        return false;
                                    }
                                });
                                if (gap > 0.5) {
                                    ka.glog('isTranAbleTime-delay(' + gap + ')');
                                    return false; // 시간지연 
                                }
                                if (gap < 0) {
                                    ka.glog('isTranAbleTime-fake(' + gap + ')');
                                    return false; // 현재보다 더 나중 시간으로 데이터 조작? 
                                }
                                return true;
                            }
                        }
                    }
                    // core area end ============= 
                    ////////////////////////////////////////////////////////////////////////////////////////////////  
                })());
                kareui.constructor();
                logYMD = ka.utils.getTimestemp().substr(2, 10);
                // ka.productList = productList;
                if (location.host.indexOf('127.0.0.1:') == -1) {
                    // console.log = function() {};
                }
                if (ka.env.parameters && ka.env.parameters.pid) {
                    let pid = ka.env.parameters.pid;
                    if (getKuproductInfo(pid)) {
                        ka.loadView('Product', {
                            pid: pid
                        });
                    } else {
                        ka.loadView('Main');
                    }

                } else {
                    ka.loadView('Main');
                }

                if (ka.env.parameters) {
                    if (ka.env.parameters.bfcd) {
                        ka.ga({
                            eventAction: 'site_bfcd#' + ka.env.parameters.bfcd, //서브화면명 
                            eventLabel: ka.env.parameters.bfcd //이벤트명
                        });
                    } else if (ka.env.parameters.fbclid) {
                        ka.ga({
                            eventAction: 'site_bfcd#' + 'fbclid_' + ka.env.parameters.fbclid, //서브화면명 
                            eventLabel: 'fbclid_' + ka.env.parameters.fbclid //이벤트명
                        });
                    }
                }

                ka.loadView('Popoverlay', {
                    targetID: '#wrapper-popoverlay'
                });

                // ============= core area start
                window.dka = ka;
                // core area end ============= 
                if (document.documentElement.addEventListener) {
                    document.documentElement.addEventListener('click', documentClickHandler, true);
                } else {
                    document.documentElement.attachEvent('onclick', documentClickHandler);
                }

                //////////////////////////////////////////////// 
                // static function
                //////////////////////////////////////////////// 
                function documentClickHandler(event) {

                    let $target = $(event.target);
                    let logID = getLogID();
                    let parentStr = getParentStr();
                    let shellOffset = $body.offset();
                    let x = event.clientX - shellOffset.left;
                    let y = event.clientY - shellOffset.top;

                    ka.ga({
                        hitType: 'event', //이벤트 종류 
                        eventCategory: KUID, //화면명 
                        eventAction: logID, //서브화면명 
                        eventLabel: '' //이벤트명
                    });

                    // parent id
                    function getParentStr() {
                        var r = 'wrapper';
                        if ($target.closest('.page-content').length > 0) {
                            r = $target.closest('.view-content').attr('id');
                        }
                        return r;
                    }

                    function getLogID() {
                        var r = '';
                        if ($target.attr('log-id')) {
                            r = $target.attr('log-id');
                        } else if ($target.attr('id')) {
                            r = $target.attr('id');
                        } else if ($target.attr('class')) {
                            r = $target.attr('class');
                        }
                        r = $target.prop('tagName') + '_' + r.replace(/\s/g, '_')
                        return r;
                    }
                }

                function storageAvailable(type) {
                    try {
                        var storage = window[type],
                            x = '__storage_test__';
                        storage.setItem(x, x);
                        storage.removeItem(x);
                        return true;
                    } catch (e) {
                        return e instanceof DOMException && (
                                // Firefox를 제외한 모든 브라우저
                                e.code === 22 ||
                                // Firefox
                                e.code === 1014 ||
                                // 코드가 존재하지 않을 수도 있기 때문에 테스트 이름 필드도 있습니다.
                                // Firefox를 제외한 모든 브라우저
                                e.name === 'QuotaExceededError' ||
                                // Firefox
                                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                            // 이미 저장된 것이있는 경우에만 QuotaExceededError를 확인하십시오.
                            storage.length !== 0;
                    }
                }


                function setKUID() {
                    let tmpID = localStorage.getItem('karekuid');
                    // console.log('tmpID', tmpID);
                    if (tmpID && tmpID.length > 10) {
                        KUID = tmpID;
                    } else {
                        $.ajax({
                            type: 'GET',
                            url: 'https://us-central1-kareui.cloudfunctions.net/getKUID',
                            data: {},
                            dataType: 'json',
                            cache: false,
                            timeout: this.requestTimeout
                        }).done(function(responseText) {
                            // console.log('karekuid', responseText);
                            const json = responseText;
                            // console.log('karekuid json', json);
                            if (json.result == 'success' && json.id) {
                                KUID = json.id;
                                localStorage.setItem('karekuid', KUID);
                            }
                        }).fail(function(XHR, textStatus, errorThrown) {});
                    }


                }
            });
        })

    }
);
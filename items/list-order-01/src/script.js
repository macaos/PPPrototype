(function() {
    $(document).ready(function() {
        let $items = $('.item');
        let $itemWrapper = $('.items');
        let detachNode = null;
        let isMoving = false;
        let $targetItem = null;
        let startY = null;
        let diffY = 0;
        let fullLen = $items.length;
        let itemH = $('.item').eq(0).outerHeight();
        let longPressTime = null;
        let longPressEvent = null;
        const $itemFake = $('.item-fake');
        const $itemDetachMark = $('.item-detach-mark');
        
        init();
        function init(){
            initIdx();
            arrange();
            enterframe();
            addEvent();
        }
        
        function initIdx(){
            let orderIdx = 0;
            $items.each(function(i, item){
                $(this).attr('order-idx',orderIdx);
                orderIdx++;
            });
        }
        function arrange(){
            let len = $items.length;
            $items.eq(0).css('top', 0);
            for(let i=1; i<len; i++){
                $items.eq(i).css('top', itemH * i);
            }
        }
        function addEvent(){
            $items.on('touchstart mousedown', itemsTouchStart);
            $itemWrapper.on('touchstart mousedown', touchStart);
            $itemWrapper.on('touchmove mousemove', touchMove);
            $itemWrapper.on('touchend mouseup', touchEnd)
            $itemWrapper.on('touchcancel mouseup', touchEnd);
            $(document).on('touchcancel mouseup', touchEnd);
        }
        function getX($el) {
            return Number($el.css('left').replace('px', ''))
        }
        function getY($el) {
            return Number($el.css('top').replace('px', ''))
        }
        // enterframe
        function enterframe() {
            requestAnimationFrame( enterframe );
            if(longPressTime != null){
                longPressTime++;
                if(longPressTime > 30){
                    console.log('trigggg1')
                    $itemWrapper.trigger('touchmove',longPressEvent);
                    $itemWrapper.trigger('mousemove',longPressEvent);
                }
            }
        }
        function itemsTouchStart(e){
            $targetItem = $(this);
        }
        function touchStart(e){
            startY = e.pageY || e.originalEvent.changedTouches[0].pageY;
            longPressTime = 1;
            longPressEvent = e;
            isMoving = true;
        }
        function touchMove(e, triggere){
            if(!isMoving || !$targetItem)return;
            if(triggere)e = triggere;
            const mouseY = e.pageY || e.originalEvent.changedTouches[0].pageY;
            const mouseRY = mouseY - $itemWrapper.offset().top;
            const hitIdx = parseInt(mouseRY/itemH);
            diffY = (mouseY) - startY;
            const absDiffY = Math.abs(diffY);

            // improvement of scrolling up and down while swiping
            if (absDiffY > 7 || longPressTime) {
                // arrange, run only once
                if(fullLen == $items.length){
                    longPressTime = null;
                    detachNode = $targetItem.detach()
                    $itemWrapper.addClass('grabbing');
                    $items = $('.item');
                    $itemFake.show();
                    $itemFake.text($targetItem.text());
                    $itemDetachMark.show();
                    arrange();
                }
                $itemFake.css('top', mouseRY);
                
            }
            checkDetachLoc($items.eq(hitIdx));

            isMoving = true;
            
            function checkDetachLoc($el){
                if($el.length == 0)return;
                const elPosTop = $el.position().top;
                const elH = itemH;
                if(elPosTop + elH/2 < mouseRY){
                    $itemDetachMark.css('top',elPosTop + elH);
                } else {
                    $itemDetachMark.css('top',elPosTop);
                }
            }
        }
        function touchEnd(e){
            longPressTime = null;
            $itemWrapper.removeClass('grabbing')
            if(detachNode){
                insertDetachNode();
            }
            detachNode = null;
            $targetItem = null;
            isMoving = false;
            $itemFake.hide();
            $itemDetachMark.hide();
        }
        function insertDetachNode(){
            const idx = parseInt($itemDetachMark.position().top/itemH) - 1;
            if(idx == -1){
                $items.eq(0).before(detachNode);
            } else {
                $items.eq(idx).after(detachNode);
            }
            $items = $('.item');
            arrange();
        }
    });
})()
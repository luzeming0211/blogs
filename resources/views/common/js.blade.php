<script data-cfasync="false" src="{{asset('assets/article')}}/js/email-decode.min.js"></script>
<script src="{{asset('assets/article')}}/js/waves.min.js"></script>
<script>
    var BLOG = {ROOT: '/', SHARE: false, REWARD: false};
</script>
<script src="{{asset('assets/article')}}/js/main.min.js"></script>
<script async src="{{asset('assets/article')}}/js/busuanzi.pure.mini.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.1.1/highlight.min.js"></script>
<script>
    hljs.initHighlightingOnLoad();
</script>
<script>
    (function () {
        var OriginTitile = document.title, titleTime;
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                document.title = '你不是不要我了吧！';
                clearTimeout(titleTime);
            } else {
                document.title = '你终于来了!';
                titleTime = setTimeout(function () {
                    document.title = OriginTitile;
                }, 2000);
            }
        });
    })();
</script>

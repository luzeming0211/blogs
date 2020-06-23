<div id="loading" class="active"></div>
<aside id="menu">
    <div class="inner flex-row-vertical">
        <a href="javascript:void(0);" target="" rel="noopener" class="header-icon waves-effect waves-circle waves-light"
           id="menu-off">
            <i class="icon icon-lg icon-close"></i>
        </a>
        <div class="brand-wrap" style="background-image:url({{asset('assets/article')}}/images/brand.jpg)">
            <div class="brand">
                <a href="/" class="avatar waves-effect waves-circle waves-light">
                    <img src="{{asset('assets/article')}}/picture/avatar.png">
                </a>
                <hgroup class="introduce">
                    <h5 class="nickname">GG_BOOM</h5>
                    <a href="/cdn-cgi/l/email-protection#add5d5d5edd9c8c3cec8c3d983c0c8" target="_blank" rel="noopener"
                       title="xxx@tencent.me" class="mail"><span class="__cf_email__"
                                                                 data-cfemail="245c5c5c6450414a47414a500a4941">[email&#160;protected]</span></a>
                </hgroup>
            </div>
        </div>
        <div class="scroll-wrap flex-col">
            <ul class="nav">
                <li class="waves-block waves-effect active">
                    <a href="/">
                        首页
                    </a>
                </li>
                @foreach($admin_user as $key => $val)
                    <li class="waves-block waves-effect active">
                        <a href="/article/user/{{ $val->id }}">
                            {{ $val->username }}
                        </a>
                    </li>
                @endforeach
            </ul>
        </div>
    </div>
</aside>

@extends('common.main')
@section('title', 'aa')

@section('content')
    <header class="top-header" id="header">
        <div class="flex-row">
            <a href="javascript:void(0);" target="" rel="noopener"
               class="header-icon waves-effect waves-circle waves-light on" id="menu-toggle">
                <i class="icon icon-lg icon-navicon"></i>
            </a>
            <div class="flex-col header-title ellipsis">使用教程汇总</div>
        </div>
    </header>
    <header class="content-header post-header">
        <div class="container fade-scale">
            <h1 class="title">使用教程汇总</h1>
            <h5 class="subtitle">
                <time datetime="2019-12-16T16:09:04.000Z" itemprop="datePublished" class="page-time">
                    2019-12-17
                </time>
            </h5>
        </div>
    </header>


    <div class="container body-wrap">
        <article id="article" class="post-article article-type-post fade hljs" itemprop="blogPost">
            {!! $aArticle->content_html !!}
        </article>
    </div>
@endsection
@section('js_ext')

@endsection



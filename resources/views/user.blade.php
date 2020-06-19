@extends('common.main')
@section('title', '首页')

@section('content')

    <header class="top-header" id="header">
        <div class="flex-row">
            <a href="javascript:void(0);" target="" rel="noopener"
               class="header-icon waves-effect waves-circle waves-light on" id="menu-toggle">
                <i class="icon icon-lg icon-navicon"></i>
            </a>
            <div class="flex-col header-title ellipsis">{{ $aArticle->admin_user->username }}</div>
        </div>
    </header>

    <header class="content-header index-header">
        <div class="container fade-scale">
            <h1 class="title">{{ $aArticle->admin_user->username }}</h1>
            <h5 class="subtitle">
            </h5>
        </div>
    </header>

    <div class="container body-wrap">
        <ul class="post-list">
            @if(!$aArticle->isEmpty())
            @foreach($aArticle as $key => $val)
                <li class="post-list-item fade">
                    <article id="post-Windows-V2RayN"
                             class="article-card article-type-post" itemprop="blogPost">
                        <div class="post-meta">
                            <time class="post-time" title="{{ $val->created_at }}"
                                  itemprop="datePublished">{{ $val->created_at }}
                            </time>
                            {{--                            <ul class="article-category-list">--}}
                            {{--                                <li class="article-category-list-item"><a class="article-category-list-link"--}}
                            {{--                                                                          href="/categories/Windows/">Windows</a></li>--}}
                            {{--                            </ul>--}}
                        </div>

                        <h3 class="post-title" itemprop="name">
                            <a class="post-title-link" href="/{{ $val->id }}">{{ $val->title }}</a>
                        </h3>

                        <div class="post-content" id="post-content" itemprop="postContent">
                            {{ $val->title }}
                            <a href="/{{ $val->id }}" class="post-more waves-effect waves-button">
                                Continue reading...
                            </a>
                        </div>

                        <div class="post-footer">

                            {{--                            <ul class="article-tag-list" itemprop="keywords">--}}
                            {{--                                <li class="article-tag-list-item"><a class="article-tag-list-link" href="/tags/SS/"--}}
                            {{--                                                                     rel="tag">SS</a></li>--}}
                            {{--                                <li class="article-tag-list-item"><a class="article-tag-list-link" href="/tags/V2Ray/"--}}
                            {{--                                                                     rel="tag">V2Ray</a></li>--}}
                            {{--                            </ul>--}}
                        </div>
                    </article>
                </li>
            @endforeach
        </ul>

        <nav id="page-nav">
            <div class="inner">
                @if($aArticle->previousPageUrl())
                    <a class="extend prev" rel="prev" href="{{ $aArticle->previousPageUrl() }}">上一页</a>
                @endif
                <span class="page-number current">{{ $aArticle->currentPage() }}</span>
                @if($aArticle->nextPageUrl())
                    <a class="extend next" rel="next" href="{{ $aArticle->nextPageUrl() }}">下一页</a>
                @endif

            </div>
        </nav>
    </div>
    @endif
@endsection


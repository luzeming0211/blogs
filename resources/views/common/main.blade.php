<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>@yield('title')</title>
    <meta charset="utf-8">
    <title>使用文档</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="theme-color" content="#3F51B5">
    <meta name="keywords" content="">
    <link rel="shortcut icon" href="/favicon.ico">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @include('common.css')
</head>
<body>
@include('common.aside')
<main id="main">
@yield('content')
@include('common.footer')
</main>
</body>
@include('common.js')
@yield('js_ext')
</html>

<?php

if (!function_exists('isWeixinBrowser')) {
    function isWeixinBrowser()
    {
        if (strpos($_SERVER["HTTP_USER_AGENT"], "MicroMessenger")) {
            return true;
        } else {
            return false;
        }
    }
}


if (!function_exists('isMobile')) {
    function isMobile()
    {
        $sUserAgent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
        $sUserAgent = strtolower($sUserAgent);
        if (preg_match('/iphone|android|ipad|windows phone|micromessenger/i', $sUserAgent)) {
            return true;
        }
        return false;
    }
}

if (!function_exists('du')) {
    function du($link)
    {
        if (empty($link) || strstr($link, 'http://')) {
            return $link;
        }
        return 'http://' . $link;
    }
}

if (!function_exists('getFileUrl')) {
    function getFileUrl($file = '')
    {
        return config('app.url') . '/upload/' . $file;
    }
}

if (!function_exists('ld')) {
    function ld($val)
    {
        Log::info($val);
    }
}

if (!function_exists('getWxDomain')) {
    function getWxDomain()
    {
        $ws_config = config('swoole_http.server');
        $domain = env('APP_DOMAIN');
        return $domain . ':' . $ws_config['port'];
    }
}

if (!function_exists('ldd')) {
    function ldd($val)
    {
        Log::info($val);
        die();
    }
}

if (!function_exists('sg')) {
    function sg(&$val, $defVal = NULL)
    {
        return empty($val) ? $defVal : $val;
    }
}

if (!function_exists('sg2')) {
    function sg2(&$val, $defVal = NULL)
    {
        return isset($val) ? $defVal : $val;
    }
}

if (!function_exists('getsize')) {
    function getsize($size, $format = 'kb')
    {
        $p = 0;
        if ($format == 'kb') {
            $p = 1;
        } elseif ($format == 'mb') {
            $p = 2;
        } elseif ($format == 'gb') {
            $p = 3;
        }
        $size /= pow(1024, $p);
        return number_format($size, 3);
    }
}

if (!function_exists('getUploadPath')) {
    function getUploadPath($path = '')
    {
        return public_path('upload/' . $path);
    }
}

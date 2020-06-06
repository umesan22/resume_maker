<!DOCTYPE html>
<html lang="{{str_replace('_', '_', app()->getLocale())}}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{csrf_token()}}">

    <script>
        window.Laravel = {csrfToken: '{{csrf_token()}}'}
    </script>
    <!-- Title/Icon -->
    <link rel="shortcut icon" href="{{ asset('/favicon.ico') }}">
    <title>ResuMaker</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{asset('css/app.css')}}" rel="stylesheet">
</head>
<body>
    <div id="app"></div>
</body>
    <script src="{{asset('js/app.js')}}" defer></script>
</html>
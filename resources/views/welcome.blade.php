<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">

<head>
    <meta charset="utf-8">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=5">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">


    <meta name="keywords" content="crrent, cr, coerência, coerencia, razão, razao, car, rent, rental, madeira, island">
    <meta name="author" content="Rúben Freitas">
    <meta name="description" content="Crrent">



    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#603cba">
    <meta name="msapplication-TileColor" content="#603cba">
    <meta name="theme-color" content="#ffffff">



    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&display=swap" rel="stylesheet">

    <title>CR-rent</title>
</head>

<style>
    html,
    body,
    #index {
        height: 100%;
        font-family: 'Poppins', sans-serif;
        scroll-behavior: smooth;
    }

    body {
        margin: 0;
        position: relative;
    }

    body h1,
    body h2,
    body h3,
    body h4,
    body h5 {
        color: rgba(0, 0, 0, 1);
    }
</style>



<body>
    <div id="index">
        <script src="{{mix('js/app.js')}}"></script>
    </div>
</body>



</html>
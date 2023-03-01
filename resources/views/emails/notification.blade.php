<!DOCTYPE html>
<html>

<head>

    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Resumo de atividades</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">

    </style>

</head>

<body style="background-color: #e9ecef;">
    <table border="0" cellpadding="0" cellspacing="0" width="100%">

        <tr>
            <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 36px 24px;">
                            <a href="https://cr-rent.com" target="_blank" style="display: inline-block;">
                                <img src="https://cr-rent.com/image/logo.png" alt="Logo" border="0" width="48"
                                    style="display: block; width: 120px; max-width: 120px; min-width: 120px;">
                            </a>
                        </td>
                    </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>

        <tr>
            <td align="center" bgcolor="#e9ecef">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                            <h1 style="font-size: 24px;margin-bottom: 0px;">Resumo de atividades </h1>
                            <h3 style="font-size: 16px;color: #777; margin-top: 0px;margin-bottom: 50px;">
                                {{date('d-m-Y')}}</h3>

                            <h2 style="font-size: 18px;">Levantamentos</h2>
                            <ul>
                                @foreach ($pickups as $pickup)
                                <li>{{$pickup}}</li>
                                @endforeach
                            </ul>
                            <h2 style="font-size: 18px; margin-top: 30px">Devoluções</h2>
                            <ul>
                                @foreach ($returns as $return)
                                <li>{{$return}}</li>
                                @endforeach
                            </ul>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

        <tr>
            <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                <!--[if (gte mso 9)|(IE)]>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
        <tr>
        <td align="center" valign="top" width="600">
        <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <!-- start unsubscribe -->
                    <tr>
                        <td align="center" bgcolor="#e9ecef"
                            style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                            <p style="margin: 0;">
                                +351 934 953 682 | Rua das pretas Nº4 2ºL 9000-049 Funchal</p>
                        </td>
                    </tr>
                    <!-- end unsubscribe -->

                </table>
                <!--[if (gte mso 9)|(IE)]>
        </td>
        </tr>
        </table>
        <![endif]-->
            </td>
        </tr>
    </table>



</body>

</html>
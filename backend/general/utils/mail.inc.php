<?php

//////
class mail {
    function sendEmail($email) {
        $ini_file = parse_ini_file($_SERVER['DOCUMENT_ROOT'] . '/model/api.ini');
        //////
        switch ($email['type']) {
            case 'contact':
                $emailto="santisolerllin@gmail.com";
                $subject="Contact message";
                $totype="Admin";
                $message=$email['message'];
                $emailcontact=$email['email'];
                if ($email['email']=="") {
                    $html="<p>From annonymus</p><p>Message: $message</p>";
                }else{
                    $html="<p>From $emailcontact</p><p>Message: $message</p>";
                }
                break;
            case 'validate':
                $emailto=$email['email'];
                $token_link=$email['token'];
                $subject="Validate Account";
                $totype="Client";
                $html="<p>This email is valid for 1 hour</p><p>Click on the link to validate the account:<a href=$token_link>Validate account</a></p>";
                break;
            case 'recover_password':
                $emailto=$email['email'];
                $token_link=$email['token'];
                $subject="Recover passowrd";
                $totype="Client";
                $html="<p>This email is valid for 1 hour</p><p>Click on the link to recover your password:<a href=$token_link>Recover</a></p>";
                break;                
        }// end_switch
            // case 'admin';
                
            //     break;
            //     //////
            // case 'recover';
            //     $email['fromEmail'] = 'support@getyourcar.com';
            //     $email['inputMatter'] = 'Recover Password.';
            //     $content .= "<h2>Thanks for contacting us.</h2>";
            //     $content .= "<a href = '" . common::friendlyURL('?page=login&op=recover&param=' . $email['token']) ."'>Click here for recover your password.</a>";
            //     break;
            //     //////
            // case 'validate';
            //     $email['fromEmail'] = 'support@getyourcar.com';
            //     $email['inputMatter'] = 'Email verification.';
            //     $content .= '<h2>Email verification.</h2>';
            //     $content .= '<a href = "' . common::friendlyURL('?page=login&op=verify&param=' . $email['token']) . '">Click here for verify your email.</a>';
            //     break;
                //////
        //////
        $message = <<<DATA
        {
            "Messages":[
                {
                    "From": {
                        "Email": "santisolerllin@gmail.com",
                        "Name": "Admin"
                    },
                    "To": [
                        {
                        "Email": "$emailto",
                        "Name": "$totype"
                        }
                    ],
                    "Subject": "$subject",
                    "TextPart": "Email",
                    "HTMLPart": "$html"
                }
            ]
        }
        DATA;

        $ch = curl_init();
        //////
        curl_setopt($ch, CURLOPT_URL, 'https://api.mailjet.com/v3.1/send');
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $message);
        curl_setopt($ch, CURLOPT_USERPWD, $ini_file['mail-user'] . ':' . $ini_file['mail-user2']);

        $headers = array();
        $headers[] = 'Content-Type: application/json';
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        $result = curl_exec($ch);
        if (curl_errno($ch)) {
            echo 'Error:' . curl_error($ch);
        }
        curl_close($ch);
    }// end_setEmail
    
}// end_mal

?>

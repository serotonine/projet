<?php


// if(isset ($_POST["name"]) && isset ($_POST["mail"]) && isset ($_POST["subject"]) && isset ($_POST["mess"])){
//   $name = $_POST['name'];
//   $mail = $_POST['mail'];
//   $mess = $_POST['subject'];
//   $message = $_POST['mess'];
//   echo $name." ".$mail." ".$mess;
//
// }
if(isset ($_POST["nam"])&& isset ($_POST["mail"]) && isset($_POST["subject"])&& isset ($_POST["mess"])){

      $to = 'julie.danjou.job@gmail.com';
     $subject = $_POST["subject"];
     $message = $_POST["mess"];
     $headers = 'From:'.$_POST["nam"].' <'.$_POST["mail"] .'>';

     mail($to, $subject, $message, $headers);
     $reponse = array ('fr'=>'Merci pour votre message!','en'=>'thank you for your message !', 'nl'=>'bedankt voor u bericht !');
     echo json_encode($reponse);
  }

else{ echo "Missing parameters"; }
//
// $mail =  mail ( string "julie.danjou.job@gmail.com" , string $subject , string $message [, string $additional_headers [, string $additional_parameters ]] );
?>

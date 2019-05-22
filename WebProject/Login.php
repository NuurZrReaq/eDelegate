<?php
$db = new mysqli("localhost:3306","root","","dbwebproject");
header('Access-Control-Allow-Origin: *');
error_reporting(E_ERROR | E_PARSE);
$CatJson;
$CatObj = new ArrayObject();
if(isset($_REQUEST["Operation"])){
    $operation = $_REQUEST{"Operation"};
    switch ($operation){
        case "Login":
            $userName = $_REQUEST["UserName"];
            $password =$_REQUEST["Password"];
            $query = "Select * from user where username='" .$userName."' and password='".$password ."' and StatusId=1"; //echo $query;
            $result = $db->query($query);
            if($result ->num_rows ==0){
                $CatObj[0]= "User Doesnt exist";

            }
            else {
                $mode = $result->fetch_assoc()["MainProfile"];
                $token = RandomString();
                $query = "update user set token='".$token. "' where username ='".$userName."'";
                $result = $db->query($query);
                if($result){
                    $CatObj[0]="Success";
                    $CatObj[2]= $mode;
                    $CatObj[1]= $token;
                }
                else {
                    $CatObj[0]= "Failed to update token";
                }
            }
            break;
        case "SignUp":

            $userName = $_REQUEST["UserName"];
            $password =$_REQUEST["Password"];
            $Name = $_REQUEST["Name"];
            $Mobile = $_REQUEST["Mobile"];
            $Phone = $_REQUEST["Phone"];
            $Email = $_REQUEST["Email"];
            $MainMode = $_REQUEST["MainProfile"];
            $CorpName = $_REQUEST["CorpName"];
            $status =1;
            //$Rating = 1;
            $token = RandomString();
            $query = "Insert into user (username,password,name,mobile,phone,mainProfile,Email,Corpname,Statusid,
                      token) values ('".$userName."','".$password."','".$Name."','".$Mobile."','".$Phone.
                      "',".$MainMode.",'".$Email."','".$CorpName."',".$status.",'".$token."')";
            $result=$db->query($query);
            if($result){
                $CatObj[1]= $token;
                $CatObj[0]= "Success";
                $CatObj[2]= $MainMode;
            }
            else {
               // echo"$Email"."\n";

                $CatObj[0]= "Failed to sign up";
            }
            break;
        default : $CatObj[0]= "Unknown Operation Sent to Login.php";

    }
}
function RandomString()
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < 100; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
$CatJson = json_encode($CatObj);
echo $CatJson;
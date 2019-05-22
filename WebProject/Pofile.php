<?php
/**
 * Created by PhpStorm.
 * User: Noor
 * Date: 4/29/2019
 * Time: 2:22 AM
 */
header('Access-Control-Allow-Origin: *');
error_reporting(E_ERROR | E_PARSE);
$db = new mysqli("localhost:3306","root","","dbwebproject");
$CatJson;
$CatObj = new ArrayObject();
if(isset($_REQUEST["Operation"])) {
    $Operation = $_REQUEST["Operation"];

    $token = $_REQUEST["token"];
    $userName1 = $_REQUEST["UserName"];
    $query = "select * from user where token ='" .$token. "' and StatusId=1 and Name ='".$userName1."'";
    $result1 = $db->query($query);
    if ($result1->num_rows > 0) {
        switch ($Operation) {
            case "EditProfile":
                $userName = $_REQUEST["UserName"];
                $password =$_REQUEST["Password"];
                $Name = $_REQUEST["Name"];
                $Mobile = $_REQUEST["Mobile"];
                $Phone = $_REQUEST["Phone"];
                $Email = $_REQUEST["Email"];
                $MainMode = $_REQUEST["MainProfile"];
                $CorpName = $_REQUEST["CorpName"];
                $status =1;
                $query = "Update user set Name='".$Name."' and UserName='".$userName."' and Password = '".$password."' and
                            Mobil ='".$Mobile."' and Phone = '".$Phone."' and Email = '".$Email."' 
                            and MainProfile =".$MainMode." and CorpName ='".$CorpName."' and statusId =1 where token = '".$token.
                            "' and Username = '".$userName1."'";
                $result=$db->query($query);
                if($result){
                    //$CatObj[1]= $token;
                    $CatObj[0]= "Success";
                    //$CatObj[2]= $MainMode;
                }
                else {
                    // echo"$Email"."\n";

                    $CatObj[0]= "Failed toUpdate";
                }
                break;
            case "GetProfile":
                $row =$result1->fetch_all();
                $CatObj[0] = "Success";
                $CatObj[1]=$row;
                break ;

            default: $CatObj[0]= "Unknown Operation";
        }
    }
    else { // not found
        $CatObj[0] = "NotFound";
    }
}
else {// no Operation
    $CatObj[0] = "No Operation";

}
$CatJson = json_encode($CatObj);
echo $CatJson;
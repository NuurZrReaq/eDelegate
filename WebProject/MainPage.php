<?php
header('Access-Control-Allow-Origin: *');
error_reporting(E_ERROR | E_PARSE);
$db = new mysqli("localhost:3306","root","","dbwebproject");
if(isset($_REQUEST["Operation"])) {
    $Operation = $_REQUEST["Operation"];
    switch ($Operation){
        case "LoggingIn":
            $CatJson;
            $CatObj = new ArrayObject();
            //$userName = $_REQUEST["UserName"];
            $token =$_REQUEST["token"];
            $query = "Select * from user where token ='".$token."' and StatusId=1";
            $result = $db->query($query);
            if($result->num_rows == 1){
                $query = "Select * from categories where statusid=1";
                $result = $db->query($query);
                if($result->num_rows>0){
                    $i=1;
                    while($row = $result->fetch_assoc()) {
                        //$cat = "Category".$i;
                        $CatObj[$i]=$row["Name"];
                        $catId = $row["Id"];
                        $query = "Select t1.Name,t1.Description,t1.Price,t2.SrcFile from item as t1 INNER JOIN image as t2 on t1.imageId = t2.id where t1.CategoryId= ".$catId." and t1.statusId=1";
                        $result1=$db->query($query);
                        if($result1->num_rows>0){
                           //$rr = $result->fetch_row();
                            //$CatObj[$i+1] = $rr;
                            $j=1;
                            while (($row1 = $result1->fetch_row()) || $j <4){

                                $CatObj[$i+$j]=$row1;
                                $j++;
                            }
                        }
                        $i+=4;
                    }
                    $CatObj[0] = "Success";
                    $CatJson = json_encode($CatObj);
                    echo $CatJson;
                }
                else{
                    $CatObj[0] = "No Categories";
                    $CatJson = json_encode($CatObj);
                    echo $CatJson;
                }
                //to get 3 itemss from each catt;

            }
            else{
                $CatObj[0] = "Failed";
                $CatJson = json_encode($CatObj);
                echo $CatJson;
            }
            break;
        //default : echo "Unknown Operation Sent to Login.php";
    }
}

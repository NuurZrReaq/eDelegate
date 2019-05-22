<?php
/**
 * Created by PhpStorm.
 * User: Noor
 * Date: 4/27/2019
 * Time: 1:51 AM
 */
header('Access-Control-Allow-Origin: *');
error_reporting(E_ERROR | E_PARSE);
$db = new mysqli("localhost:3306","root","","dbwebproject");
if(isset($_REQUEST["Operation"])) {
    $Operation = $_REQUEST["Operation"];
    $CatJson;
    $CatObj = new ArrayObject();
    switch ($Operation) {

        case "GetItems":
            $token = $_REQUEST["token"];
            $catName = $_REQUEST["catName"];
            $query = "Select * from user where token ='".$token."' and StatusId=1";
            $result = $db->query($query);
            if($result->num_rows>0){
                $query = "select id from categories where Name = '".$catName."' and StatusId=1";
                $result = $db->query($query);
                if($result->num_rows>0){
                    $row = $result->fetch_assoc();
                    $catId = $row["id"];
                    $query = "Select t1.Name,t1.Description,t1.Price,t2.SrcFile from item as t1 INNER JOIN image as t2 on t1.imageId = t2.id where t1.CategoryId=".$catId." and t1.statusId=1";
                    $result=$db->query($query);
                    if($result->num_rows>0){
                        $row = $result->fetch_all();
                        $CatObj[1]=$row;
                        $CatObj[0] = "Success";
                    }
                    else{//No   Items
                         $CatObj[0] = "No Items";
                    }
                }
                else{//no Category
                    $CatObj[0] = "No Category";
                }

            }
            else {//not logged in
                $CatObj[0] = "Not Logged in ";

            }
            $CatJson = json_encode($CatObj);
            echo $CatJson;
            break;
        case "GallerySearch":
            break;
        //default : echo "Unknown Operation Sent to Login.php";

    }
}
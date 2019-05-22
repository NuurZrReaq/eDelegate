<?php
/**
 * Created by PhpStorm.
 * User: Noor
 * Date: 4/27/2019
 * Time: 2:51 AM
 */
header('Access-Control-Allow-Origin: *');
error_reporting(E_ERROR | E_PARSE);
$db = new mysqli("localhost:3306","root","","dbwebproject");
$CatJson;
$CatObj = new ArrayObject();
$specs = new ArrayObject();

if(isset($_REQUEST["Operation"])) {
    $Operation = $_REQUEST["Operation"];
    $token = $_REQUEST["token"];
    $query = "Select * from user where token ='".$token."' and StatusId=1";
    $result = $db->query($query);
    if($result->num_rows>0){
        switch ($Operation) {
            case "InsertItem":
                $ItemName = $_REQUEST["ItemName"];
                $Price = $_REQUEST["Price"];
                $Desc = $_REQUEST["Description"];
                $Src = $_REQUEST["SrcFile"];
                $catId = $_REQUEST["catId"];
                $SellerName = $_REQUEST["UserName"];
                $specCount = $_REQUEST["specCount"];
                $specName[(int)$specCount];
                $specValue[(int) $specCount];
                for( $i =0; $i<(int)$specCount;$i++){
                    $specName [$i] = $_REQUEST["specName"."$i"];
                    $specValue [$i]= $_REQUEST["specValue"."$i"];

                }
                //$CatObj[3] = $specName;
                //$CatObj[4] = $specValue;
                $query = "Select Id from user where userName ='".$SellerName."'";
                $result = $db->query($query);
                if($result->num_rows>0){
                    $row =$result ->fetch_assoc();
                    $userId = $row["Id"];
                }
                else {
                    $CatObj[0] = "Cannot find any users";
                }

                $query = "Insert into image(SrcFile) Values('".$Src."')";
                $result = $db->query($query);
                if(!$result){
                    $CatObj[0] = "Cant Add the Image";

                }
                $query = "Select Id from image where SrcFile ='".$Src."'";
                $imageId = $db->query($query)->fetch_assoc()["Id"];
                $query = "Insert into item(Name,Description,Price,ImageId,CategoryId,UserId,StatusId) Values('".$ItemName."','".$Desc."','".$Price."','".$imageId."','".$catId."','".$userId."',1)";
                //$query = "Select s.Name from specifications as s INNER JOIN categorySpecs as cs on s.Id = cs.SpecId INNER JOIN categories as c on c.Id = cs.CategoryId where CategoryId =".$catId." and c.statusId=1 and s.StatusId=1 and cs.StatusId=1";
                //$query = "Select id from specifications where name ="
                $result = $db->query($query);
                if($result){
                    $query = "Select id from Item where Name ='".$ItemName."'";
                    $result = $db->query($query);
                    if($result->num_rows>0){
                        $itemId = $result->fetch_assoc()["id"];
                        for( $i =0; $i<$specCount;$i++){
                            $CatObj[3]=$specName[$i];
                            $query="Select id from specifications where Name ='".$specName[$i]."'";
                            $result1 = $db->query($query);
                            if($result1->num_rows>0){
                                $specId = $result1->fetch_assoc()["id"];
                                $query="Insert into  itemspecs (ItemId,SpecId,Value) values (".$itemId.",".$specId.",'".$specValue[$i]."')";
                                $result2=$db->query($query);
                                if($result2){
                                    $CatObj[0]="Success";
                                }
                                else{
                                    $CatObj[0]="Shiiiit";
                                    break;
                                }
                            }
                            else {
                                $CatObj[0] = "shiiiiiiiiiiiiiit";
                                break;
                            }


                        }
                    }else{
                        $CatObj[0]="Cannot find item";
                    }


                }

                else if(!$result){
                    $CatObj[0] = "Cant Add the Item";

                }

                break;
            default: $CatObj[0] = "Unknown Operation";
        }

    }
    else {//Not Logged In
        $CatObj[0] = "Not Logged In";
    }

}
else {// No Operation Send ;
    $CatObj[0]= "No Operation Send";
}

//for( $i =0; i<$specCount;
$CatJson = json_encode($CatObj);
echo $CatJson;
//}
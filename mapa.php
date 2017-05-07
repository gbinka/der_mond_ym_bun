<?php

//phpinfo();


$dir='./assets/tilemaps/';
$files = scandir($dir);

$parts=array();
if(isset($_GET['level']))
	$level=$_GET['level'];
else
	$level=1;

foreach ($files as $file){
if (strpos($file, 'level'.$level.'_part') !== false)
	array_push($parts,$file);

}

shuffle($parts);
//array_unshift($parts,'level'.$level.'_first.json');
array_push($parts,'level'.$level.'_finish.json');



function mergeParts($part1,$part2){

$resolution=60;
$old_height=$part1->height;
$new_height=$part2->height;
$old_nextobjectid = $part1->nextobjectid;
$new_nextobjectid = $part2->nextobjectid+$old_nextobjectid;
//Layers
$old_layers=[];
foreach($part1->layers as $layer){
	$old_layers[$layer->name]=$layer;
}

$new_layers=[];
foreach($part2->layers as $layer){
	$new_layers[$layer->name]=$layer;
}

//Wysokość
$part1->height+=$part2->height;

//Data
$old_layers['Stopnie']->data=array_merge($new_layers['Stopnie']->data,$old_layers['Stopnie']->data);


//zwiekszenie y w objektach, zwiększenie height w layers, podmiana gid w nowych, zwiększenie id w nowych
foreach($old_layers as $k=>$layer){
	if(array_key_exists($k, $new_layers)){
		$old_layers[$k]->height+=$new_layers[$k]->height;
		if($k!='Stopnie'){
			foreach($old_layers[$k]->objects as $single_object){
				$single_object->y+=$new_height*$resolution;
			}
			$old_gid=$old_layers[$k]->objects[0]->gid;
			foreach($new_layers[$k]->objects as $single_object){
				$single_object->id+=$old_nextobjectid;
				$old_layers[$k]->objects[]=$single_object;
			}
		}
	}	
}
$marged_layers=[];
foreach($old_layers as $layer)
	$marged_layers[]=$layer;

$part1->layers=$marged_layers;

return $part1;

}


$map='';
foreach ($parts as $file){
	$f=json_decode(file_get_contents($dir.$file,'r'));
	if ($map=='')
		$map=$f;
	else
		$map=mergeParts($map,$f);
	
}

//White floor on beggining
for($x=count($map->layers[0]->data)-20;$x<count($map->layers[0]->data);$x++)
	$map->layers[0]->data[$x]=5;

$map=json_encode($map);

echo $map;


?>
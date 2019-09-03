// JavaScript Document 
//Глобальные переменные
var data=[];
var data_view=[];
var page=0;
var edit=-1;
//Фильтры по солбцам
var o_id = document.getElementById('id');
var o_fname = document.getElementById('fname');
var o_lname = document.getElementById('lname');
var o_gender = document.getElementById('gender');
var o_memo = document.getElementById('memo');
var o_img = document.getElementById('img');
//Поля редактирования
var e_id = document.getElementById('e_id');
var e_fname = document.getElementById('e_fname');
var e_lname = document.getElementById('e_lname');
var e_gender_m = document.getElementById('e_gender_m');
var e_gender_f = document.getElementById('e_gender_f');
var e_memo = document.getElementById('e_memo');
var e_img = document.getElementById('e_img');
//Кнопки редактора
var editor = document.getElementById('editor');
var cancel = document.getElementById('cancel');
var save = document.getElementById('save');

var o_table = document.getElementById('table');
var o_nav = document.getElementById('nav');
var o_serch = document.getElementById('filter');
//Перехват событий
o_id.onclick = my_search;
o_fname.onclick = my_search;
o_lname.onclick = my_search;
o_gender.onclick = my_search;
o_memo.onclick = my_search;
o_img.onclick = my_search;
o_table.onclick = view_edit;
cancel.onclick = function (){editor.style.display="none";};//Скрытие окна редкатирования
save.onclick = save_edit;
o_serch.oninput = my_search;
window.onhashchange = view;

function save_edit(){
	//Сохранение изменений в основной массив
	data[data_view[edit].n].id=e_id.value;
	data[data_view[edit].n].name.first=e_fname.value;
	data[data_view[edit].n].name.last=e_lname.value;
	if(e_gender_m.checked){data[data_view[edit].n].gender="Male";}
	if(e_gender_f.checked){data[data_view[edit].n].gender="Female";}
	data[data_view[edit].n].memo=e_memo.value.split('\n');
	edit=-1;//Сброс номера элемпента редактирования
	editor.style.display="none";//Скрытие окна редкатирования
	my_search();//Вызов алгоритма поиска для проверки сохранённых изменения
}
//Открытие редактора
function view_edit(event){
	event = event || window.event
	edit=event.target.className;
	e_id.value=data[data_view[edit].n].id;
	e_fname.value=data[data_view[edit].n].name.first;
	e_lname.value=data[data_view[edit].n].name.last;
	if(data[data_view[edit].n].gender=="Male"){e_gender_m.checked=true;}
	if(data[data_view[edit].n].gender=="Female"){e_gender_f.checked=true;}
	e_memo.innerHTML="";
	for (var j=0; j<data[data_view[edit].n].memo.length; j++){
		e_memo.innerHTML+=data[data_view[edit].n].memo[j];
		if(j!=data[data_view[edit].n].memo.length-1) e_memo.innerHTML+="\n";
	}
	e_img.src=data[data_view[edit].n].img;
	editor.style.display="block";
}
//Вывод таблицы
function view(){
	if(data_view[0]!=null){
		o_nav.innerHTML="";//Вывод навигации
		for (var i=0; i<data_view.length/10; i++){
			o_nav.innerHTML+="<a href='#"+i+"' class='nav_e'>"+(i+1)+"</a> ";
		}
		page=Number(window.location.hash.replace("#",""));
		if(page>data_view.length/10) {
			window.location.hash="#0"; 
			page=Number(window.location.hash.replace("#",""));
		}
		var res="";
		res="<tr>";//Формирования загоовка
		if(o_id.checked) res+="<td>Индификатор</td>";
		if(o_fname.checked) res+="<td>Имя</td>";
		if(o_lname.checked) res+="<td>Фамилия</td>";
		if(o_gender.checked) res+="<td>Пол</td>";
		if(o_memo.checked) res+="<td>Ключевые фразы</td>";
		if(o_img.checked) res+="<td>Изображение</td>";
		res+="</tr>";
		for (var i=page*10; (i<(page+1)*10) && (i<data_view.length); i++){//Вывод содержимого
			res+="<tr>";
			if(o_id.checked) res+="<td class='"+i+"'>"+data_view[i].id+"</td>";
			if(o_fname.checked) res+="<td class='"+i+"'>"+data_view[i].name.first+"</td>";
			if(o_lname.checked) res+="<td class='"+i+"'>"+data_view[i].name.last+"</td>";
			if(o_gender.checked) res+="<td class='"+i+"'>"+data_view[i].gender+"</td>";
			if(o_memo.checked){
				res+="<td class='"+i+"'>";
					for (var j=0; j<data_view[i].memo.length; j++) res+=data_view[i].memo[j]+"<br/>";
				res+="</td>";
			}
			if(o_img.checked && data_view[i]) res+="<td class='"+i+"'><img src='"+data_view[i].img+"'/></td>";
			res+="</tr>";
		}
		o_table.innerHTML=res;
	}else{
		
		o_nav.innerHTML="";
		o_table.innerHTML="Совпадений не найдено!";	
	}
}



function my_search(){//Поиск
	var ser=o_serch.value;
	var j=0;
	data_view=[null];
	
	for (var i=0; i<data.length; i++){//Перебор основного массива данных
		var tmp={};
		tmp.name={}
		tmp.memo=[];
		if(o_id.checked && data[i].id.indexOf(ser)!=-1){ tmp.id=data[i].id.substring(0,data[i].id.indexOf(ser))+"<b class='light'>"+data[i].id.substring(data[i].id.indexOf(ser),data[i].id.indexOf(ser)+ser.length)+"</b>"+data[i].id.substring(data[i].id.indexOf(ser)+ser.length); }
		
		if(o_fname.checked && data[i].name.first.indexOf(ser)!=-1){ tmp.name.first=data[i].name.first.substring(0,data[i].name.first.indexOf(ser))+"<b class='light'>"+data[i].name.first.substring(data[i].name.first.indexOf(ser),data[i].name.first.indexOf(ser)+ser.length)+"</b>"+data[i].name.first.substring(data[i].name.first.indexOf(ser)+ser.length); }

		if(o_lname.checked && data[i].name.last.indexOf(ser)!=-1){ tmp.name.last=data[i].name.last.substring(0,data[i].name.last.indexOf(ser))+"<b class='light'>"+data[i].name.last.substring(data[i].name.last.indexOf(ser),data[i].name.last.indexOf(ser)+ser.length)+"</b>"+data[i].name.last.substring(data[i].name.last.indexOf(ser)+ser.length); }

		if(o_gender.checked && data[i].gender.indexOf(ser)!=-1){ tmp.gender=data[i].gender.substring(0,data[i].gender.indexOf(ser))+"<b class='light'>"+data[i].gender.substring(data[i].gender.indexOf(ser),data[i].gender.indexOf(ser)+ser.length)+"</b>"+data[i].gender.substring(data[i].gender.indexOf(ser)+ser.length); }
		
		for (var k=0; k<data[i].memo.length; k++) {
		if(o_memo.checked && data[i].memo[k].indexOf(ser)!=-1){ tmp.memo[k]=data[i].memo[k].substring(0,data[i].memo[k].indexOf(ser))+"<b class='light'>"+data[i].memo[k].substring(data[i].memo[k].indexOf(ser),data[i].memo[k].indexOf(ser)+ser.length)+"</b>"+data[i].memo[k].substring(data[i].memo[k].indexOf(ser)+ser.length); }
		
		}
		
		if(tmp.id || tmp.name.first || tmp.name.last || tmp.gender || tmp.memo.length>0 || tmp.img) {//Сохранение найденных данных в массив для вывода

			data_view[j]={};
			data_view[j].name={};
			data_view[j].memo=[];
			data_view[j].n=i;

			data_view[j].id=data[i].id;
			data_view[j].name.first=data[i].name.first;
			data_view[j].name.last=data[i].name.last;
			data_view[j].gender=data[i].gender;
			for (var k=0; k<data[i].memo.length; k++) data_view[j].memo[k]=data[i].memo[k];
			data_view[j].img=data[i].img;

			if(tmp.id) data_view[j].id=tmp.id;
			if(tmp.name.first) data_view[j].name.first=tmp.name.first;
			if(tmp.name.last) data_view[j].name.last=tmp.name.last;
			if(tmp.gender) data_view[j].gender=tmp.gender;
			for (var k=0; k<data[i].memo.length; k++) if(tmp.memo[k]) data_view[j].memo[k]=tmp.memo[k];
			if(tmp.img) data_view[j].img=tmp.img;
			
			j++;
		}
	}	
	view();
}
  
//Получение JSON файла
var url = 'data.json'; 
var page_num = 0;
var request = new XMLHttpRequest();
request.open('get', url, true);
request.send();

request.onreadystatechange = function() {
	if (this.readyState!=4) return; //ещё не готово
	if (this.status!=200) { // обработать ошибку
		document.getElementById('table').innerHTML="Ошибка:\n"+(this.status ? this.statusText : "неизвестная ошибка");
		return;
	}  
	
	data = JSON.parse(this.responseText);
	
	
	for (var i=0; i<data.length; i++){//Сохранение данных в массив для вывода
		data_view[i]={};
		data_view[i].name={};
		data_view[i].memo=[];
		data_view[i]=data[i];
		data_view[i].n=i;
	}
	view();
}

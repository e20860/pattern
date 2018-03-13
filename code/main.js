//////////////////////////////////////////////////////////////////////////////////////////////////
//
//                                   art.js
//   решение задачи подготовки стрельбы для артиллерийской батареи
//
//////////////////////////////////////////////////////////////////////////////////////////////////
function main() {
   // главная функция, которая всё и делает...
   console.log("Hello, world");
   // Константы
   DEG_TO_RAD = Math.PI/180; //Коэффициент перевода градусов в радианы
   RAD_TO_DEG = 180/Math.PI; // и обратно    
   
   // таблицы для расчёта поправок
   
   var cts ='{"f":  {"3":	["1",	"3",	"14",	"9",	"17",	"40",	"50",	"02"], "4":	["1",	"4",	"26",	"15",	"30",	"50",	"62",	"02"], "5":	["1",	"5",	"42",	"23",	"46",	"58",	"73",	"02"],	     "6":	["2",	"7",	"64",	"31",	"66",	"66",	"83",	"04"],	     "7":	["3",	"8",	"91",	"39",	"88",	"72",	"90",	"08"],	     "8":	["4",	"9",	"123","47",	"113","77",	"96",	"08"],	     "9":	["5",	"10",	"159","55",	"139","81",	"101","12"],	     "10":	["7",	"12",	"198","62",	"164","85",	"106","16"],	     "11":	["8",	"13",	"241","69",	"189","89",	"111","20"],	     "12":	["10","14",	"286","77",	"215","92",	"115","24"],	     "13":	["11","15",	"334","87",	"240","97",	"121","40"],	     "14":	["14","16",	"387","97",	"263","103","129","40"]}, "r":	 {"3":	["1",	"4",	"21",	"10",	"21",	"24",	"48",	"02"],	     "4":	["2",	"6",	"40",	"16",	"37",	"29",	"58",	"02"],	     "5":	["3",	"7",	"67",	"22",	"58",	"34",	"67",	"04"],	     "6":	["4",	"9",	"99",	"29",	"81",	"37",	"74",	"04"],	     "7":	["5",	"10",	"134","35",	"105","40",	"80",	"08"],	     "8":	["6",	"11",	"173","41",	"130","43",	"86",	"12"],     	  "9":	["7",	"12",	"214","48",	"155","46",	"91",	"16"],     	  "10":	["8",	"13",	"258","54",	"182","48",	"96",	"20"],     	  "11":	["10","14",	"305","61",	"207","51",	"101","30"],     	  "12":	["13","15",	"356","70",	"229","54",	"108","40"]}, "1":  {"3":	["2",	"5",	"28",	"9",	"24",	"23",	"46",	"02"],	     "4":	["2",	"6",	"56",	"14",	"43",	"29",	"57",	"02"],	     "5":	["3",	"8",	"89",	"20",	"65",	"31",	"62",	"04"],	     "6":	["5",	"9",	"125","25",	"89",	"34",	"67",	"08"],	     "7":	["6",	"10",	"164","30",	"114","36",	"73",	"08"],	     "8":	["7",	"11",	"205","36",	"139","40",	"80",	"12"],	     "9":	["9",	"12",	"247","42",	"164","43",	"85",	"16"],	     "10":	["11","13",	"292","50",	"189","46",	"91",	"24"],	     "11":	["15","15",	"340","57",	"212","49",	"98",	"30"]}, "2":	 {"3":	["2",	"5",	"47",	"7",	"32",	"17",	"42",	"02"],	     "4":	["3",	"5",	"81",	"12",	"55",	"19",	"48",	"02"],	     "5":	["4",	"7",	"120","15",	"78",	"21",	"53",	"04"],	     "6":	["6",	"8",	"157","20",	"103","24",	"61",	"08"],	     "7":	["7",	"9",	"197","26",	"126","27",	"67",	"12"],	     "8":	["9",	"10",	"238","31",	"150","29",	"73",	"16"],	     "9":	["11","11",	"277","38",	"172","32",	"81",	"20"]}, "3":  {"3":	["3",	"3",	"57",	"4",	"32",	"16",	"41",	"02"],	     "4":	["4",	"4",	"85",	"7",	"49",	"21",	"52",	"02"],	     "5":	["5",	"5",	"114","11",	"68",	"25",	"62",	"04"],	     "6":	["7",	"6",	"143","15",	"88",	"29",	"72",	"08"],	     "7":	["9",	"7",	"172","19",	"100","33",	"83",	"12"],	     "8":	["14","8",	"201","24",	"114","38",	"94",	"16"]}, "4":	 {"3":	["4",	"3",	"29",	"3",	"14",	"16",	"52",	"02"],	     "4":	["6",	"4",	"42",	"6",	"22",	"20",	"67",	"04"],	     "5":	["8",	"5",	"61",	"9",	"30",	"25",	"82",	"08"],	     "6":	["13","6",	"86",	"14",	"40",	"29",	"97",	"12"]}}';
   
   var ts = JSON.parse(cts);   
    
   
   //**********************************************************************************************   
   // Вспомогательные функции
   function isNumeric(n) {
      // Проверка на числовой тип
      return !isNaN(parseFloat(n)) && isFinite(n);
   }   
   //----------------------------------------------------------------------------------------------
   function convertAlphaToRad(al) {
      // Преобразование дирекционного угла в строковом представлении (41-25) в радианы
      var adeg = al.split('-');
      return (+adeg[0] + adeg[1]/100)*6 * DEG_TO_RAD;
   } 
   //---------------------------------------------------------------------------------------------      
   function convertRadToAlpha(a) {
      // преобразование угла, представленного в радианах - в деления угломера в строковом представлении 
      var ia = (a * RAD_TO_DEG / 6).toFixed(2).split('.');
      return ia[0] + '-' + ia[1];
   }
   //**********************************************************************************************
   // Решение прямой и обратной геодезических задач
   //**********************************************************************************************
   // dgp - direct geodesic problem - Прямая Геодезическая задача
   // На входе два объекта point и polar, на выходе - объект Coords
   function dgp(pnt,pol) {
      var crd = new Coords(0,0,0); // Пустой объект
      crd.x = Math.round(pnt.x + pol.dist * Math.cos(pol.alpha.val()));
      crd.y = Math.round(pnt.y + pol.dist * Math.sin(pol.alpha.val()));
      crd.h = Math.round(pnt.h + pol.dist * pol.e/955);  // с учётом 5% поправки
      return crd;
   }    
   //**********************************************************************************************
   // igp - inverse geodesic problem - обратная геодезическая задача
   // На входе - два объекта Coords, на выходе - объект Polar
   function igp(tgt,fp) {
      var deltaX = tgt.x - fp.x;
      var deltaY = tgt.y - fp.y;
      var deltaH = tgt.h - fp.h;
      var dist = Math.round(Math.sqrt(deltaX*deltaX + deltaY*deltaY));
      var eps = Math.round(deltaH / dist * 955);
      var ang = Math.acos(deltaX/dist);
      ang = deltaY > 0 ? ang : 2*Math.PI - ang;
      var retVal = new Polar(convertRadToAlpha(ang),dist,eps);
      return retVal;
   }
   //**********************************************************************************************
   function Du(bd,md) {
      // Lирекционнный угол (в делениях угломера с вытребеньками)
      // Варианты ввода:
      // 1 "45-10"
      // 2 45,10  - две цифры
      var bdu,mdu,rad;
      
      if (bd && md) {
         bdu = +bd;
         mdu = +md;
      } else if (bd.indexOf('-') != -1) {
         var aa = bd.split('-');
         bdu = +aa[0];
         mdu = +aa[1];
      } else {
         bdu = 0;
         mdu = 0;
      };
      function toRad() {
         return (bdu + mdu/100) * 6 * DEG_TO_RAD; // угол в радианах
      }
      
      rad = toRad();

      this.recount = function (rr) {
         // Пересчёт из радиан в деления угломера (большие и маленькие)
         var ia = (rr * RAD_TO_DEG / 6).toFixed(2).split('.');
         bdu = +ia[0];
         mdu = +ia[1];
         rad = rr;
      }
      this.add = function (bd,md) {
         // Прибавляет угол в делениях угломера
         if (!bd) {
            bd = 0;
         }
         if (!md) {
            md = 0;
         }
         if (typeof(bd) == "string") {
            if (bd.indexOf('-') != -1) {
               var aa = bd.split('-');
               bd = +aa[0];
               md = +aa[1];
            } else {
               bd = +bd;  // переводим в цифру
            }
         }         
         bd = bd%60; // приводим к первому кругу (не более 360 градусов)
         var term1 = bdu + mdu/100;
         var term2 = bd + md/100
         var sum = term1 + term2;
         if (sum > 60) {
            sum -= 60;
         }
         bdu = Math.floor(sum);
         mdu = Math.round((sum -bdu)*100);
         rad = toRad();
         
         return this;
      } // add

      this.sub = function (bd,md) {
         // Вычитает из даного угла угол, переданный в аргументах
         if (!bd) {
            bd = 0;
         }
         if (!md) {
            md = 0;
         }
         if (typeof(bd) == "string") {
            if (bd.indexOf('-') != -1) {
               var aa = bd.split('-');
               bd = +aa[0];
               md = +aa[1];
            } else {
               bd = +bd;  // переводим в цифру
            }
         }         
         bd = bd%60; // приводим к первому кругу (не более 360 градусов)
         
         var num = bdu + mdu/100;
         var sub = bd + md/100
         var diff = num - sub;
         if (diff < 0) {
            diff += 60;
         }
         bdu = Math.floor(diff);
         mdu = Math.round((diff -bdu)*100);
         rad = toRad();
         return this;
      } // sub

      this.toString = function () {
         var addMdu = mdu < 10 ? '0' : '';
         return '' + bdu + '-' + addMdu + mdu;
      }
      
      this.val = function () {
         return rad;
      }
   } // Du
   
   //**********************************************************************************************
   function Coords(x,y,h) {
      // Объект прямоугольные координаты (составляющая любого артиллерийского объекта: пункта, цели и т.д)
      this.x = x;
      if (x == undefined) {
         this.x = 0;
      }
      this.y = y;
      if (y == undefined) {
         this.y = 0;
      }
      this.h = h;
      if (h == undefined) {
         this.h = 0;
      }
      this.toString = function () {
         return 'X= ' + this.x + ', Y= ' + this.y + ', H= ' + this.h + ';'; 
      }
   };
   //***********************************************************************************************
   function Polar(a,d,e) {
      // полярные координаты
      //
      this.alpha = new Du(a); // дирекционный угол "41-25"
      this.dist  = d;
      this.e = 0;      //  Угол места цели в малых делениях угломера (единицах) 2-41 = 241
      if (isNumeric(e)) {
         this.e = +e;  
      }
      this.toString = function () {
         return 'Дирекционный = ' + this.alpha.toString() + ', Дальность = ' + this.dist + ', угол места = ' + this.e;
      }
   };   
   //***********************************************************************************************
   function Corrections(dx, dz) {
      // Объект поправки
      this.dx = dx;
      if (dx == undefined) {
         this.dx = 0;
      }
      this.dz = dz;
      if (dz == undefined) {
         this.dz = 0;
      }
   }
   //----------------------------------------------------------------------------------------------
   function scCorrections(dist,dx,dz) {
      // Поправки для ГРП (shedule of calculated corrections)
      Corrections.apply(dx,dz);
      this.dist = dist;
      if (dist == undefined) {
         this.dist = 0;
      }
   } //sccCorrections
   //***********************************************************************************************
   function Dimensions(f,d) {
      this.front = f;
      this.deep = d;
      this.toString = function () {
         return 'Ф = ' + this.front + ', Г = ' + this.deep;
      }
   }; // Dimensions 
   //***********************************************************************************************
   function Point(name,crd) {
      // именованая точка стояния артиллерийского объекта. По идее, родоначальник класса
      this.name = name;
      this.coords = new Coords(crd.x, crd.y, crd.h);
      // геттеры      
      this.getX = function () {
         return this.coords.x;
      };

      this.getY = function () {
         return this.coords.y;
      };
      
      this.getH = function () {
         return this.coords.h;
      };
      this.getCoords = function () {
         return this.coords;
      };
      // сеттеры
      this.setX = function (n) {
         if (!isNumeric(n)) n = 0;
         this.coords.x = n;
      };
      this.setY = function (n) {
         if (!isNumeric(n)) n = 0;
         this.coords.y = n;
      };
      this.setCoords = function (crd) {
         this.coords.x = crd.x;
         this.coords.y = crd.y;
         this.coords.h = crd.h;
      }
      
   }; // point
   //***********************************************************************************************
   function Cop(name,crd,unit) {
      // КНП артиллерийского подразделения
      Point.apply(this,arguments); // наследуем
      this.unit = unit; // подразделение
      //
      this.getFullName = function () {
         return this.name + ' ' + this.unit;
      }
      
      this.toString = function () {
         return "КНП " + this.unit + ", координаты: " + this.coords.toString();
      }
      
   }; // Knp
   //***********************************************************************************************
   function Target(name,crd,num, type,front,deep) {
      // цель
      Point.apply(this, arguments); // inherit
      this.num  = num;
      this.type = type;
      this.dimensions = new Dimensions(front, deep);
     
      this.getFullName = function () {
         return this.name + ', цель ' + this.num + '-я';
      }
      this.getShortName = function () {
         return 'Ц ' + this.num;
      }
      this.getDimensions = function () {
         return this.dimensions;
      }
      
      this.getFront = function () {
         return this.simensions.front;
      }
      
      this.getDeep = function () {
         return this.dimensions.deep;
      }
      //
      this.setFront = function (n) {
         if (!isNumeric(n)) n = 0;
         this.dimensions.front = n;
      }      
      
      this.setDeep = function (n) {
         if (!isNumeric(n)) n = 0;
         this.dimensions.deep = n;
      }      
      this.toString = function () {
         return  this.name + ', цель ' + this.num + '-я' +  ", координаты: " + this.coords.toString() + ', ' + this.dimensions.toString();
      }
   }; // Target
   //***********************************************************************************************
   function Gun(num) {
      // артиллерийское орудие
      var cors = new Corrections();  // Поправки относительно основного в дальность и направление
      this.num = num; // бортовой или заводской номер
      // геттеры      
      this.getDx = function () {
         return cors.dx;
      };
      this.getDz = function () {
         return cors.dz;
      }
      // сеттеры
      this.setCors = function (cr) {
         cors.dx = cr.dx;
         cors.dz = cr.dz;
      }
      
      
   };  // Gun
   
   //***********************************************************************************************
   function FirPos(name,crd,unit) {
      // Огневая позиция батареи
      Point.apply(this,arguments);
      this.unit = unit;
      this.mfd = new Du('00-00'); // main firing direction Основное направление стрельбы 0 - по умолчанию
      var guns = []; //Орудия (массив)
      var dimensions = new Dimensions(0,0);
      var cors = [];  // ГРП
      var mainGun;   // Основное орудие
      var tz = 15;   // температура зарядов
      var deltaV0 = 0; // Отклонение начальной скорости основного орудия
      //сеттеры
      this.setMainGun = function (gn) {
         mainGun = +gn;
      };
      this.setTz = function (temperature) {
         tz = temperature;
      }
      this.setDimensions = function (dm) {
         dimensions.front = dm.front;
         dimensions.deep  = dm.deep;
      }
      this.setGun = function (gun,numInBatr) {
         if (isNumeric(numInBatr)) {
            guns[numInBatr] = gun;
         } else {
            guns.push(gun);
         }
      };

      this.setDeltaV0 = function (delta) {
         deltaV0 = delta;
      }
      
      this.setMfd = function (ang) {
         if (ang instanceof Du) {
            this.mfd = ang;
         }
      };
      
      this.toString = function () {
         return "ОП " + this.unit + ", координаты: " + this.coords.toString();
      }
      
      this.calcCorrections = function (charge, dd, mb) {
         // Расчёт графика рассчитанных поправок (составление массива) для батареи
         // аргументы: заряд, массив дальностей  и метеобюллетень
         // заполняет объект cors
         // Рассчёт отклонений от табличных
         var zz,wz,dh,dt,dtz,dv0,wx,grp;
         var deviations = [];
         zz = 0;
         wz = 1;
         wx = 2;
         dh = 3;
         dt = 4;
         dtz = 5;
         dv0 = 6;
         grp = 7;
         // направление баллистического ветра: угол ветра - цель без ветра
         function getBalWind(ttnnss) {
            var duw =  new Du(ttnnss.slice(2,4) + '-00');
            return this.mfd.val() - duw.val();
         }
         // давление
         var dhams = + mb.hhhtt.slice(0,3);
         if (dhams > 500) {
            dhams = (dhams - 500) * (-1);
         }
         var deltaH = (dhams + ((+mb.hhhh) - this.coords.h ) / 10);
         // температура воздуха
         function getTW(ttnnss) {
            var dTW  = +ttnnss.slice(0,2);
            if (dTW > 50) {
               dTW = -1 * (dTW - 50);
            }
            return dTW;
         }         
         // отклонение температуры зарядов
         deltaTz = tz - 15;
         
         function calcOneDist(dist) {
            // расчёт поправок на одну дальность
            var tabStr = ts[charge][dist];  // строка таблицы поправок (массив)
            var grb = mb[tabStr[grp]];      // группа метеобюллетеня на данную дальность
            var retC = [];
            retC[zz] = tabStr[zz];
            retC[wz] = ((Math.sin(getBalWind(grb)) * (+grb.slice(4,2))) *(tabStr[wz])/10);
            retC[wx] = ((Math.cos(getBalWind(grb)) * (+grb.slice(4,2))) *(tabStr[wx])/10);
            retC[dh] = (deltaH/10) * tabStr[dh];
            retC[dt] = (getTW(grb) /10) * tabStr[dt];
            retC[dtz]= (deltaTz/10) * tabStr[dtz];
            retC[dv0]= deltaV0 * tabStr[dv0];
            var cz = retC[zz] *(-1) + (retC[wz] * (-1)); // суммарная поправка в направление
            var cx = (retC[wx] * (-1)) + retC[dh] + (retC[dt] * (-1)) + (retC[dtz] * (-1)) + (retC[dv0] * (-1));
            return new scCorrections(dist,cx,cz); 
         } // calcOneDist
         // Заполняем график расчитанных поправок
         cors = [];
         for (var i = 0; i < dd.length; i++) {
            var scc = calcOneDist(dd[i]);
            cors.push(scc);   
         }
      }  // this.calcCorrections
   } // FirPos Firing Position
   //*********************************************************************************************

   function Mbul() {
      // метеорологический бюллетень "метеосредний/приближённый"
      var stdh = ["02","04","08","12","16","20","24","30","40","50","60","70","80"]; // стандартные высоты бюллетеня
      var self = this;
      this.type = "11 приближённый";
      this.ddhhm = "00000";
      this.hhhh = "0000";
      this.hhhtt = "00000";
      stdh.forEach(function (elem) {
         self[elem] = "000000";
      });
      // Составление бюллетеня
      this.compose = function (dt,hmp,hhh,tt,aa,ss) {
         var deltaAlpha = [1,2,3,3,4,4,4,5,5]; // Изменение дирекционного угла ветра по высоте
         // Таблица распределение скорости ветра по высоте 
         // от 2 до 15 метров в секунду
         var table2 = [
            [3,4,4,4,4,4,4,4,4],
            [4,5,5,5,6,6,6,6,6],
            [6,7,8,8,8,9,9,9,10],
            [8,10,10,11,11,11,12,12,12],
            [9,11,11,12,13,13,14,14,14,],
            [10,12,13,13,14,14,15,15,16],
            [12,14,15,16,17,17,18,18,19],
            [14,17,18,19,20,20,21,21,22],
            [15,18,19,20,21,21,22,23,24],
            [16,20,21,22,23,24,25,25,26],
            [18,22,23,24,25,26,27,28,29],
            [20,23,25,26,27,28,29,30,32],
            [21,25,27,28,29,30,32,32,34],
            [22,27,28,30,32,32,34,36,36]
         ];
         // Таблица распределения температуры воздуха по высоте
         // от -40 до -10: с дискретностью 10 градусов (нужна интерполяция)
         // от -10 до -3 : с дискретностью 1 градус (брать без изменений)
         // свыше -3: температура с изменением высоты - не меняется. То с чем вошли - то и в бюллетене
         var table3 = [
            [-39,-38,-37,-35,-34,-32,-31,-30,-27],
            [-29,-29,-28,-26,-25,-24,-23,-22,-20],
            [-20,-19,-18,-17,-17,-16,-15,-15,-14],
            [-9,-9,-8,-8,-7,-7,-7,-6,-6],
            [-8,-8,-7,-7,-7,-6,-6,-5,-5],
            [-8,-8,-7,-6,-6,-6,-5,-5,-4],
            [-7,-6,-6,-5,-5,-5,-5,-4,-4],
            [-6,-6,-6,-5,-4,-4,-4,-4,-4],
            [-5,-5,-5,-4,-4,-4,-4,-4,-4],
            [-4,-4,-4,-4,-3,-3,-3,-3,-3],
            [-3,-3,-3,-3,-3,-3,-2,-2,-2]
         ]; 

         function getVirtualTemp(temp) {
           // Возвращает виртуальную температуру
           var retTemp = temp;
           if (temp > 0 && temp <= 5) {
              retTemp = temp + 0.5;                
           } else if (temp > 5 && temp < 10) {
              retTemp = temp + 0.5 +(temp-5)*0.1;
           } else if (temp >=10 && temp <= 15) {
              retTemp = temp + 1;
           } else if (temp > 15 && temp <= 20) {
              retTemp = temp + 1 +(temp-15)*0.1;
           } else if (temp > 20 && temp <= 25) {
              retTemp = temp + 1.5 +(temp-20)*0.1;
           } else if (temp > 25 && temp <= 30) {
              retTemp = temp + 2 +(temp-25)*0.3;
           } else if (temp > 30 && temp <= 40) {
              retTemp = temp + 3.5 +(temp-30)*0.1;
           };
           return retTemp;
         } // getVirtualTemp
         
         function getWindArray(ws) {
            // Возвращает массив скоростей по высоте
            if (ws < 2 || ws > 15) {
               return [0,0,0,0,0,0,0,0,0];
            } else {
               return table2[ws-2];
            }
         } // getWindArray
         
         function getTemperatureArray(vt) {
            // возвращает массив метеоэлементов(температуру) по высотам
            // вход - виртуальная температура
            var retArr = [], ind, a1,a2, quot, step;
            if (vt >= -40 && vt < -10) {
               // Массив вычисляется интерполяцией между двумя смежными колонками 
               if (vt >= -40 && vt < -30) {
                  a1 = table3[0];
                  a2 = table3[1];
                  ind = -30;
               } else if (vt >= -30 && vt < -20) {
                  a1 = table3[1];
                  a2 = table3[2];
                  ind = -20;
               } else if (vt >= -20 && vt < -10) {
                  a1 = table3[2];
                  a2 = table3[3];
                  ind = -10
               };
               quot = (vt - ind)/-10; // Коэффициент интерполяции
               for (var i = 0; i < 9; i++) {
                  var v = (a1[i] - a2[i]) * quot + a2[i];
                  retArr.push(Math.round(v));
               }
               
            } else if (vt >= -10 && vt < -3) {
               // Каждому значению температуры - свой массив
                ind = vt + 13; // индекс таблицы. - 10 соответствует 3 строка массива, -9 = 4-я и т.д.
                retArr = table3[ind];
            } else {
                // Все 9 элементов массива имеют одинаковое значение, равное виртуальной температуре
                for (var i = 0; i<9;i++) {
                   retArr.push(vt);
                }
            };
            return retArr;
         }; //getTemperatureArray
         
         function formatM(n) {
            // Форматирует число в двухсимвольную группу для метеобюллетеня. Отрицательные - через 50ж
            var tt;
            if (n < 0) {
               tt = String(n*-1 + 50);
            } else if (n < 10) {
               tt = "0" + n;
            } else {
               tt = String(n);
            }
            return tt;
         } // formatM
         
         // Составляем бюллетень: первые 4 группы - вручную, остальные - циклом
         // 1 group
         self.type = "11 приближённый";
         // 2 group

        
         self.ddhhm = formatM(dt.getDate()) + formatM(dt.getHours()) +String(Math.floor(dt.getMinutes()/10));
         // 3 group
         if (hmp > 1000) {
            self.hhhh = "" + hmp;
         } else if (hmp > 99) {
            self.hhhh = "0" + hmp;
         } else if (hmp > 9) {
            self.hhhh = "00" + hmp;
         } else if (hmp >= 0) {
            self.hhhh = "000" + hmp;
         } else {
            self.hhhh = String(5000 + hmp); // Вариант для Голландии (ниже уровня моря)
         }
         // 4 group
         var virtualTemperature = Math.round(getVirtualTemp(tt) - 15.9);

         var dh = hhh - 750;
         if (dh < 0) {
            dh = String(500 + dh*-1);   
         }  else if (dh < 10) {
            dh = "00" + dh;
         } else {
            dh = "0" + dh;
         }   
         self.hhhtt = dh + formatM(virtualTemperature);
         // from 5 group - cicle
         // Три массива для групп
         var wa = getWindArray(ss);
         var ta = getTemperatureArray(virtualTemperature);
         for (var i = 0; i < 9; i++) {
            var sh = stdh[i];  // standard hight
            var aw = aa + deltaAlpha[i];
            if (aw >= 60) {
               aw -= 60;
            } 
            self[sh] = formatM(ta[i]) + formatM(aw) + formatM(wa[i]);
         }          
         //end function fo compose meteo bulletin
      }; // compose
      //----------
      this.toString = function () {
         var rs = "Метео" + self.type + "-" + self.ddhhm + "-" + self.hhhh + "-" + self.hhhtt;
         stdh.forEach(function (elem) {
            rs += "-" + elem + "-" + self[elem];
         });
         rs += "-8080"
         return rs;
      } // toString
      //---------
      this.reception = function (bul) {
         // Приём бюллетеня из строковой переменной вида: 
         // Метео11 приближённый-06154-0150-50580-02-793906-04-794007-08-784108-12-764108-16-...-80-000000-8080
         var abul = bul.split('-');
         self.type = abul.shift().slice(5);
         self.ddhhm = abul.shift();
         self.hhhh = abul.shift();
         self.hhhtt = abul.shift();
         // дальше - цикл по группам (двухсимвольный элемент массива - ключ, шестисимвольный - значение)
         var grName, grVal;
         while (abul.length > 0) {
            grName = abul.shift();
            if (grName.length = 2) {
               grVal = abul.shift();
               self[grName] =grVal;
            } //if
         }  // while
          
      } // reception
   ///----------------------------------------------------------------------------------------///         
   } // Mbul
   //----------------------------------------------------------------------------------------------
   function getTableCorrections(charge,dist) {
      //Возвращает массив табличных поправок для заряда и дальности
      // заряд - "f","r","1","2","3","4"; дальность - в километрах
      return ts[charge][dist];
   }

 //////////////////////////////////////////////////////////////////////////////////////////////////
 
  //********************************************************************************************
  /*
  var knp5 = new Cop("кнп",new Coords(55000, 83000,340),"5 батр");
  var z1 = new Polar("22-50",1000,10);

  console.log('' + knp5);
  var c101 = dgp(knp5.coords,z1);
  console.log(c101.toString());
  
  var op5 = knp5.getCoords();
  var dat1 = igp(c101,op5)
  console.log(dat1.toString());
  var mb = new Mbul();
  mb.compose(new Date,150, 745, -14, 38, 4);
  console.log('' + mb);
  //-------------------------------------------
  var tc = getTableCorrections("f",4)
  console.log(tc);
  */
  
  var knp5 = new Cop("кнп",new Coords(21415, 59320,320),"5 батр");
  var fp5  = new FirPos("оп", new Coords(19180, 55710, 260),"5 батр");
  fp5.setMfd(new Du('11-00'));
  
  var tgt101 = new Target('пехота', dgp(knp5.coords,new Polar('14-10',2280,5)),'101','пехота', 300,200);
  console.log(tgt101.toString());
  var td = igp(tgt101.coords, fp5.coords);
  console.log(td.toString());
  
  
  
  
  
    
  
  
   
 //////////////////////////////////////////////////////////////////////////////////////////////////
} // main
///////////////////////////////////////////////////////////////////////////////////////////////////
// Собственно программа, готорая выполняется после загрузки документа
$(document).ready(main);
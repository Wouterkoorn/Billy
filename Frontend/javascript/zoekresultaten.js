// var what = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo at orci in hendrerit. Donec et varius nisi, vitae mattis elit. Sed rhoncus odio eget nisl aliquam dignissim. Donec ac auctor dui. Nullam in libero ut ligula gravida rhoncus. Pellentesque rutrum fringilla dictum. Donec imperdiet dictum justo, et hendrerit nisl pharetra eu. Etiam a dignissim libero, consectetur egestas lacus. Curabitur fermentum nisl odio, a sodales turpis pulvinar ac. Mauris lacinia, nibh ut bibendum faucibus, purus odio blandit sapien, eu malesuada velit urna id tortor. Maecenas congue, ex eget malesuada sodales, tellus neque ultrices diam, in consectetur metus quam quis sem. Fusce sodales tempus magna, id varius leo vehicula tempus. Nulla mattis nisi id congue vestibulum. Mauris accumsan viverra urna, ut vulputate dui semper non."
var poopie = [
  {
    "kenniskaart_ID": 0,
    "titel": "Lerom ipsum",
    "what": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis lorem sed lectus euismod sagittis in at augue. Maecenas tristique orci vel tellus fringilla elementum. Nullam a elementum magna. Aliquam aliquet purus lobortis ultricies egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut sapien ex, imperdiet eu vestibulum id, pellentesque in ligula. Nullam vel neque pretium, mattis lacus non, ultrices sapien. Curabitur faucibus vehicula enim, ac mattis nisi congue ut. Nullam tempus orci vel urna finibus dictum. Aliquam mollis malesuada iaculis. Mauris at felis nec quam ultricies.",
    "why": "test",
    "how": "test",
    "voorbeeld": "test",
    "rol": "test",
    "vaardigheid": "test",
    "hboi": "test"
  },
  {
    "kenniskaart_ID": 1,
    "titel": "Lerom ipsum 1",
    "what": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mattis lorem sed lectus euismod sagittis in at augue. Maecenas tristique orci vel tellus fringilla elementum. Nullam a elementum magna. Aliquam aliquet purus lobortis ultricies egestas. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut sapien ex, imperdiet eu vestibulum id, pellentesque in ligula. Nullam vel neque pretium, mattis lacus non, ultrices sapien. Curabitur faucibus vehicula enim, ac mattis nisi congue ut. Nullam tempus orci vel urna finibus dictum. Aliquam mollis malesuada iaculis. Mauris at felis nec quam ultricies.",
    "why": "test",
    "how": "test",
    "voorbeeld": "test",
    "rol": "test",
    "vaardigheid": "test",
    "hboi": "test"
  }
];

function makediv(kenniskaart){

  kenniskaart.appendChild(document.createTextNode('The man who mistook his wife for a dog'));

}

function toonkenniskaarten() {
  var kenniskaartlocatie = document.getElementsByClassName("kenniskaartencontainer");
  var kenniskaart = document.createElement('div');

  kenniskaart.setAttribute('class', 'kenniskaart');
  kenniskaartlocatie[0].appendChild(kenniskaart);
}




function samenvatten(what) {
    return what.slice(0, 150) + "...";



}


poopie.forEach(toonkenniskaarten())

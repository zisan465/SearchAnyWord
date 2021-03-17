//Element Section Here
var form=document.getElementById('form-submit'),
    itemList=document.getElementById('item-list'),
    alert=document.getElementById('alert'),
    audioPlyBtn=document.getElementById('audio-play-btn'),
 inputValue=document.getElementById('input-value');
//Our Correcting Word Show or hide Function Here
function showMenu(){
   if(itemList.className.indexOf('d-show') > -1){
    itemList.className='list-group list-group-flush mt-5 text-center d-hide'
   }else{
    itemList.className='list-group list-group-flush mt-5 text-center d-show'
   }
}
//Audio play pause icon Change Function Here
function changeIcon(e){
    e.className='bi bi-pause-circle d-block text-center';
    document.getElementById('audio').play();
    setTimeout(() => {
        e.className='bi bi-play-circle d-block text-center';
    }, 1000);
}

//Correction Word here
var myData = ['awesome', 'bouquet', 'phone', 'car','shoes','pants','books',
    'pen','mouse','sorry','consider','accord','evident','practice','intend','concern',
    'commit','issue','approach','policy','straight','stock','property','apparent','fancy',
    'concept','court','appoint','passage','vain','instance','coast','project','commission',
    'constant','circumstances','constitute','level','affect','institute','render','appeal',
    'generate','theory','range','campaign','league','labor'
] 


inputValue.addEventListener('input',()=>{
    for(let i=0; i<itemList.children.length;i++){
      if (itemList.children[i].innerText.indexOf(inputValue.value.toUpperCase()) > -1) {
          itemList.children[i].style.display='block'
      }else{ 
        itemList.children[i].style.display='none' 
      }
    }
})

//Correction Word Show Here
for(let i=0;i<myData.length;i++){
    let li=document.createElement('li');
    li.className='list-group-item list-group-item-action cursor-p';
    li.innerHTML=myData[i].toUpperCase();
    itemList.append(li);
};
itemList.addEventListener('click',e=>{
    inputValue.value=e.target.innerText;
    itemList.className='list-group list-group-flush mt-5 text-center d-hide'
    getData()
}) 


form.addEventListener('submit',e=>{ 
    e.preventDefault()
    getData() 
});

function getData() {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${inputValue.value}`)
    .then(response => response.json())
    .then(data => {
        showData(data)
    } )
}




function showData(data) {
    for (var x=tbody.rows.length-1; x>=0; x--) {
        tbody.deleteRow(x);
     }
   document.getElementById('title-name').innerText=data[0].word;
   document.getElementById('audio').setAttribute('src', data[0].phonetics[0].audio)
   document.getElementById('mouth-sound').innerText=data[0].phonetics[0].text;

   for(let i=0;i< data[0].meanings.length;i++){
       let synonyms=data[0].meanings[i].definitions[0].synonyms;
       let example=data[0].meanings[i].definitions[0].example;
       let datalist=[data[0].meanings[i].partOfSpeech,data[0].meanings[i].definitions[0].definition];

   if(synonyms==undefined){
    datalist[3]='No Synonyms Are Available'
    }else{
    data[0].meanings[i].definitions[0].synonyms.forEach((element,index) => {
        if(index<=4){
            datalist[3]+=`${element}</br>`
        }
        });
    }
   if(example==undefined){
    datalist[2]='No Exapmple Are Available'
    }else{
        datalist[2]=example;
    }

       let tr=document.createElement('tr');
       for(let x=0; x<4;x++){ 
           let td=document.createElement('td');
           td.innerHTML= datalist[x];
           tr.appendChild(td);
       }
       document.getElementById('tbody').appendChild(tr);
       
   } 
   document.getElementById('audio').play();
}

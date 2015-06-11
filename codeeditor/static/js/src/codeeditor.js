/* Javascript for CodeeditorXBlock. */

var serialize = function(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}
function CodeeditorXBlock(runtime, element) {
  
    $(function ($) {
        /* Here's where you'd do things on page load. */
    });
}
  function code_editor()
    {
        document.getElementById("compile_result").style.display='none';
        document.getElementById("loader").innerHTML='<img  id="img_loader"  src="https://blueiq.cloudblue.com/Images/loading_new.gif" />';
        var source = editor.getValue();
        var  CLIENT_SECRET = '909403caa0382485a745aeb5f9a728497ad10597';
        var lang = document.getElementById("lang");
        var select_lang = lang.options[lang.selectedIndex].value;
        //document.getElementById("error_msg").className  =  "error_msg";
        ajax_request_editor(CLIENT_SECRET,0,source, select_lang,5,262144);    
    }
    
function ajax_request_editor(CLIENT_SECRET,async,source,lang,time_limit,memory_limit)
{
var xmlhttp;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
		var response = JSON.parse(xmlhttp.responseText);
        document.getElementById("loader").innerHTML='';
        response['compile_status']=response['compile_status'].replace("\n", "<br>")
        document.getElementById("error_msg").innerHTML=response['compile_status'];
        if(response['compile_status']!='OK')
        {document.getElementById("error_msg").className = "error_msgcomplile_error"; }
		document.getElementById("output").innerHTML = response['run_status']['output_html'];
		document.getElementById("myDiv").style.display='block';
        document.getElementById("compile_result").style.display='block';
    }
  }
xmlhttp.open("POST","http://api.hackerearth.com/code/run/",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
//xmlhttp.send("client_secret="+CLIENT_SECRET+"&async="+async+"&source="+source+"&lang="+lang+"&time_limit="+time_limit+"&memory_limit="+memory_limit);
var data = {
    client_secret: CLIENT_SECRET, async: async, source : source, lang:lang, time_limit:time_limit,
    memory_limit:memory_limit};
xmlhttp.send(serialize(data));
}
   
var aceModes = {
     'C': 'c',
     'CPP': 'c_cpp',
     'CPP11':'c_cpp_highlight_rules',
     'CLOJURE':'clojure',
     'CSHARP':'csharp',
     'JAVA':'java',
     'JAVASCRIPT':'javascript',
     'HASKELL':'haskell',
     'PERL':'perl',
     'PHP':'php',
     'PYTHON':'python',
     'RUBY':'ruby',
     'HTML':'html',
     'CSS':'css'    
};

function view_sample()
{
    var lang = document.getElementById("lang");
    var select_lang = lang.options[lang.selectedIndex].value;
   editor.setValue(document.getElementById(select_lang+'-sample').innerHTML);
   editor.getSession().setMode("ace/mode/"+aceModes[select_lang]);   
}
var editor;
(function() {
    editor = ace.edit("code");
    editor.setTheme("ace/theme/solarized_light");
    editor.getSession().setMode("ace/mode/javascript");
    editor.setValue(document.getElementById('C-sample').innerHTML);
    editor.getSession().setMode("ace/mode/"+aceModes['C']);
})();
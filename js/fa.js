const arr=[
    {name:"fa_0",len:"50%",index:10,root_count:1,branch_count:2},
    {name:"fa_1",len:"25%",index:6,root_count:1,branch_count:2},
    {name:"fa_2",len:"25%",index:7,root_count:4,branch_count:3},
    {name:"fa_3",len:"25%",index:10,root_count:1,branch_count:2},
    {name:"fa_4",len:"25%",index:10,root_count:1,branch_count:2}
];
const current=arr[Math.floor(arr.length*Math.random())];

function includeLinkStyle(url){
    var link=document.createElement("link");
    link.rel="stylesheet";
    link.type="text/css";
    link.href=url;
    document.getElementsByTagName("head")[0].appendChild(link);
}
window.onload = () => {
    const body = document.body;
    const SVG_NS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(SVG_NS,"svg");

    includeLinkStyle("/css/fa/fa.css");
    includeLinkStyle("/css/fa/"+current.name+".css");

    function fa(n,root,tag) {
        if(n==0)return;
        var group=document.createElementNS(SVG_NS,"g");
        var line=document.createElementNS(SVG_NS,"line");
        line.setAttribute("x1","0%");
        line.setAttribute("y1","0%");
        line.setAttribute("x2","0%");
        line.setAttribute("y2",current.len);
        line.setAttribute("class",current.name+"_l_"+n);
        group.setAttribute("class",current.name+"_g_"+tag);
        group.appendChild(line);
        root.appendChild(group);
        for(let i=0;i!=current.branch_count;++i){
            fa(n-1,group,i);
        }
    }

    for(let i=0;i!=current.root_count;++i){
        fa(current.index,svg,"root_"+i);
    }

    body.appendChild(svg);
}

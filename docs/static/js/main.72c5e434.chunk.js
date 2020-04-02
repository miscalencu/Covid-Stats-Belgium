(this["webpackJsonpstats-app"]=this["webpackJsonpstats-app"]||[]).push([[0],{331:function(e,t,a){e.exports=a(704)},629:function(e,t,a){},704:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"get",(function(){return L}));a(332),a(534),a(303);var r=a(0),l=a.n(r),c=a(91),o=a.n(c),s=(a(629),a(717)),i=a(718),u=a(318),m=a(722),d=a(723),g=a(720),p=a(721),f=a(317),E=a(328),b=a(84),C=function(e){return l.a.createElement(l.a.Fragment,null,l.a.createElement("a",{className:e.className,href:"".concat("/Covid-Stats-Belgium","/#").concat(e.to)},e.children),!1)},h=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"404 - Page Not Found"),l.a.createElement("div",null,l.a.createElement(b.c,{to:"/"},"Go Home")))},S=a(94),D=function(e){var t="".concat("/Covid-Stats-Belgium","/#").concat(e.to);return document.location.href=t,null},v=function(){return l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Welcome"),l.a.createElement("p",null,"This is a mini React/.Net Core WebAPI website to visually display the official Belgium Covid-19 data."),l.a.createElement("p",null,"Source of data: ",l.a.createElement("a",{href:"https://epistat.wiv-isp.be/Covid/",target:"_balnk"},"https://epistat.wiv-isp.be/Covid/")),l.a.createElement("p",null,"Source code: ",l.a.createElement("a",{href:"https://github.com/miscalencu/Covid-Stats-Belgium",taget:"_blank"},"https://github.com/miscalencu/Covid-Stats-Belgium")),l.a.createElement("p",null,"Use the top menu to see different reports."))},y=a(11),O=a(12),j=a(43),N=a.n(j);a(139);function L(e,t){t=t||function(){},(e=e||{}).url||console.error("_data.get: missing Url");var a=null,n=e.url;if(e.filter){var r=[];Object.keys(e.filter).forEach((function(t){r.push({key:t,value:encodeURIComponent(e.filter[t])})})),n+=-1===n.indexOf("?")?"?":"&",n+="filterStr=".concat(JSON.stringify(r))}fetch(n).then((function(e){return e.json()})).then((function(n){var r,l,c,o=n.data?n.data:n;if(e.orderBy&&e.orderDir&&(r=o,l=e.orderBy,c=e.orderDir,o=r.sort((function(e,t){var a=e[l]?e[l]:"-",n=t[l]?t[l]:"-",r=0;return a>n&&(r="ASC"===c?1:-1),a<n&&(r="ASC"===c?-1:1),r}))),e.pageNr&&e.pageSize){var s=function(e,t,a){var n=(t-1)*a,r=e.slice(n).slice(0,a),l=Math.ceil(e.length/a);return{total:e.length,pages:l,data:r}}(o,e.pageNr,e.pageSize);o=s.data,a=s.total}t(o,a)})).catch((function(e){console.error("Error:",e)}))}var A=a(42),M=a.n(A),x=function(){var e=Object(r.useState)({data:[],loading:!0,pageNr:1,pageSize:10,orderBy:"date",orderDir:"DESC"}),t=Object(y.a)(e,2),a=t[0],c=t[1],o=Object(r.useState)([]),s=Object(y.a)(o,2),i=s[0],m=s[1],d=Object(r.useState)([]),g=Object(y.a)(d,2),f=g[0],E=g[1],b=Object(r.useState)([]),C=Object(y.a)(b,2),h=C[0],S=C[1],D=Object(r.useState)([]),v=Object(y.a)(D,2),j=v[0],L=v[1],A=Object(r.useState)(["ALL"]),x=Object(y.a)(A,2),F=x[0],_=x[1],R=Object(r.useState)(["ALL"]),B=Object(y.a)(R,2),k=B[0],w=B[1],G=Object(r.useState)(""),Y=Object(y.a)(G,2),P=Y[0],z=Y[1],T=Object(r.useState)(""),I=Object(y.a)(T,2),U=I[0],W=I[1],X=Object(r.useState)("ALL"),H=Object(y.a)(X,2),V=H[0],J=H[1],$=Object(r.useState)("ALL"),q=Object(y.a)($,2),K=q[0],Q=q[1],Z=function(e,t,r,l){c(Object.assign(a,{loading:!0})),n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetCasesDateASP"),pageNr:t,pageSize:e,orderBy:r,orderDir:l,filter:{startDate:P?new M.a(P).format("YYYY-MM-DD"):"",endDate:U?new M.a(U).format("YYYY-MM-DD"):"",region:k,province:F,ageGroup:V,sex:K}},(function(a,n){c({loading:!1,data:a,dataCount:n,pageNr:t,pageSize:e,orderBy:r,orderDir:l,emptyPlaceholder:"-"})}))};return Object(r.useEffect)((function(){n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateASP&field=region")},(function(e){return m(e)})),n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateASP&field=ageGroup")},(function(e){return S(e)})),n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateASP&field=sex")},(function(e){return L(e)})),Z(a.pageSize,a.pageNr,a.orderBy,a.orderDir)}),[P,U,k,F,V,K]),Object(r.useEffect)((function(){n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateASP&field=province&re=").concat(k)},(function(e){return E(e)}))}),[k]),l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Confirmed Cases - by Date, Age, Sex and Province"),l.a.createElement(p.a,{className:"mb-3"},l.a.createElement(p.a.Row,null,l.a.createElement(u.a,null,l.a.createElement(N.a,{selectsStart:!0,startDate:P,endDate:U,placeholderText:"From Date",className:"form-control",selected:P,onChange:function(e){return z(e)},dateFormat:"yyyy-MM-dd",isClearable:!0})),l.a.createElement(u.a,null,l.a.createElement(N.a,{selectsEnd:!0,startDate:P,endDate:U,placeholderText:"To Date",className:"form-control",selected:U,onChange:function(e){return W(e)},dateFormat:"yyyy-MM-dd",isClearable:!0})),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"Region",onChange:function(e){w(e.target.value),_("ALL")}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"Region"),i.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"Province",onChange:function(e){return _(e.target.value)}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"Province"),f.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"Age Group",onChange:function(e){return J(e.target.value)}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"Age Group"),h.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"Sex",onChange:function(e){return Q(e.target.value)}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"Sex"),j.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))))),l.a.createElement(O.Grid,Object.assign({},a,{skin:"bootstrap",onStateChange:function(e){return Z(e.pageSize,e.pageNr,e.orderBy,e.orderDir)}}),l.a.createElement(O.Column,{sortable:!0,header:"Date",className:"italic",field:"date"}),l.a.createElement(O.Column,{sortable:!0,header:"Region",className:"center bold",field:"region"}),l.a.createElement(O.Column,{sortable:!0,header:"Province",className:"center bold",field:"province"}),l.a.createElement(O.Column,{sortable:!0,header:"Age",className:"center",field:"agegroup"}),l.a.createElement(O.Column,{sortable:!0,header:"Sex",className:"center",field:"sex"}),l.a.createElement(O.Column,{sortable:!0,header:"Cases",className:"center",field:"cases"})))},F=function(){var e=Object(r.useState)({data:[],loading:!0,pageNr:1,pageSize:10,orderBy:"date",orderDir:"DESC"}),t=Object(y.a)(e,2),a=t[0],c=t[1],o=Object(r.useState)("FR"),s=Object(y.a)(o,2),i=s[0],m=s[1],d=Object(r.useState)([]),g=Object(y.a)(d,2),f=g[0],E=g[1],b=Object(r.useState)([]),C=Object(y.a)(b,2),h=C[0],S=C[1],D=Object(r.useState)([]),v=Object(y.a)(D,2),j=v[0],L=v[1],A=Object(r.useState)([]),x=Object(y.a)(A,2),F=x[0],_=x[1],R=Object(r.useState)(""),B=Object(y.a)(R,2),k=B[0],w=B[1],G=Object(r.useState)(""),Y=Object(y.a)(G,2),P=Y[0],z=Y[1],T=Object(r.useState)(["ALL"]),I=Object(y.a)(T,2),U=I[0],W=I[1],X=Object(r.useState)(["ALL"]),H=Object(y.a)(X,2),V=H[0],J=H[1],$=Object(r.useState)("ALL"),q=Object(y.a)($,2),K=q[0],Q=q[1],Z=Object(r.useState)("ALL"),ee=Object(y.a)(Z,2),te=ee[0],ae=ee[1],ne=function(e,t,r,l){c(Object.assign(a,{loading:!0})),n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetCasesDateM"),pageNr:t,pageSize:e,orderBy:r,orderDir:l,filter:{lang:i,startDate:k?new M.a(k).format("YYYY-MM-DD"):"",endDate:P?new M.a(P).format("YYYY-MM-DD"):"",region:V,province:U,district:K,city:te}},(function(a,n){c({loading:!1,data:a,dataCount:n,pageNr:t,pageSize:e,orderBy:r,orderDir:l,emptyPlaceholder:"-"})}))};return Object(r.useEffect)((function(){n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateM&lang=").concat(i,"&field=region")},(function(e){return E(e)})),ne(a.pageSize,a.pageNr,a.orderBy,a.orderDir)}),[i,k,P,V,U,K,te]),Object(r.useEffect)((function(){n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateM&lang=").concat(i,"&field=province&re=").concat(V)},(function(e){return S(e)}))}),[V]),Object(r.useEffect)((function(){n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateM&lang=").concat(i,"&field=district&re=").concat(V,"|").concat(U)},(function(e){return L(e)}))}),[V,U]),Object(r.useEffect)((function(){n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateM&lang=").concat(i,"&field=city&re=").concat(V,"|").concat(U,"|").concat(K)},(function(e){return _(e)}))}),[V,U,K]),l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,l.a.createElement("img",{width:"24",alt:"Flag",title:"Current language: ".concat(i,". Click to change!"),src:"images/".concat(i,"_flag.png"),onClick:function(e){m("FR"===i?"NL":"FR"),J("ALL"),W("ALL"),Q("ALL"),ae("ALL")},style:{cursor:"pointer"},className:"mx-2 my-2"}),"Confirmed Cases - by Date and Municipality:"),l.a.createElement(p.a,{className:"mb-3"},l.a.createElement(p.a.Row,null,l.a.createElement(u.a,null,l.a.createElement(N.a,{selectsStart:!0,startDate:k,endDate:P,placeholderText:"From Date",className:"form-control",selected:k,onChange:function(e){return w(e)},dateFormat:"yyyy-MM-dd",isClearable:!0})),l.a.createElement(u.a,null,l.a.createElement(N.a,{selectsEnd:!0,startDate:k,endDate:P,placeholderText:"To Date",className:"form-control",selected:P,onChange:function(e){return z(e)},dateFormat:"yyyy-MM-dd",isClearable:!0})),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"Region",onChange:function(e){J(e.target.value),W("ALL"),Q("ALL"),ae("ALL")}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"Region"),f.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"Province",onChange:function(e){W(e.target.value),Q("ALL"),ae("ALL")}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"Province"),h.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"District",onChange:function(e){Q(e.target.value),ae("ALL")}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"District"),j.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"City",onChange:function(e){return ae(e.target.value)}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"City"),F.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))))),l.a.createElement(O.Grid,Object.assign({},a,{skin:"bootstrap",onStateChange:function(e){return ne(e.pageSize,e.pageNr,e.orderBy,e.orderDir)}}),l.a.createElement(O.Column,{sortable:!0,header:"Date",className:"bold",field:"date"}),l.a.createElement(O.Column,{sortable:!0,header:"NIS5",className:"center bold",field:"niS5"}),l.a.createElement(O.Column,{sortable:!0,header:"Region",field:"tX_RGN_DESCR_".concat(i)}),l.a.createElement(O.Column,{sortable:!0,header:"Province",field:"tX_PROV_DESCR_".concat(i)}),l.a.createElement(O.Column,{sortable:!0,header:"District",field:"tX_ADM_DSTR_DESCR_".concat(i)}),l.a.createElement(O.Column,{sortable:!0,header:"City",field:"tX_DESCR_".concat(i)}),l.a.createElement(O.Column,{sortable:!0,header:"Cases",className:"center bold",field:"cases"})))},_=function(){var e=Object(r.useState)({data:[],loading:!0,pageNr:1,pageSize:10,orderBy:"date",orderDir:"DESC"}),t=Object(y.a)(e,2),a=t[0],c=t[1],o=Object(r.useState)("FR"),s=Object(y.a)(o,2),i=s[0],m=s[1],d=Object(r.useState)([]),g=Object(y.a)(d,2),f=g[0],E=g[1],b=Object(r.useState)([]),C=Object(y.a)(b,2),h=C[0],S=C[1],D=Object(r.useState)([]),v=Object(y.a)(D,2),j=v[0],N=v[1],L=Object(r.useState)([]),A=Object(y.a)(L,2),M=A[0],x=A[1],F=Object(r.useState)(["ALL"]),_=Object(y.a)(F,2),R=_[0],B=_[1],k=Object(r.useState)(["ALL"]),w=Object(y.a)(k,2),G=w[0],Y=w[1],P=Object(r.useState)("ALL"),z=Object(y.a)(P,2),T=z[0],I=z[1],U=Object(r.useState)("ALL"),W=Object(y.a)(U,2),X=W[0],H=W[1],V=function(e,t,r,l){c(Object.assign(a,{loading:!0})),n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetCasesDateMCum"),pageNr:t,pageSize:e,orderBy:r,orderDir:l,filter:{lang:i,region:G,province:R,district:T,city:X}},(function(a,n){c({loading:!1,data:a,dataCount:n,pageNr:t,pageSize:e,orderBy:r,orderDir:l,emptyPlaceholder:"-"})}))};return Object(r.useEffect)((function(){n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateCumM&lang=").concat(i,"&field=region")},(function(e){return E(e)})),V(a.pageSize,a.pageNr,a.orderBy,a.orderDir)}),[i,G,R,T,X]),Object(r.useEffect)((function(){n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateCumM&lang=").concat(i,"&field=province&re=").concat(G)},(function(e){return S(e)}))}),[G]),Object(r.useEffect)((function(){n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateCumM&lang=").concat(i,"&field=district&re=").concat(G,"|").concat(R)},(function(e){return N(e)}))}),[G,R]),Object(r.useEffect)((function(){n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateCumM&lang=").concat(i,"&field=city&re=").concat(G,"|").concat(R,"|").concat(T)},(function(e){return x(e)}))}),[G,R,T]),l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,l.a.createElement("img",{width:"24",alt:"Flag",title:"Current language: ".concat(i,". Click to change!"),src:"images/".concat(i,"_flag.png"),onClick:function(e){m("FR"===i?"NL":"FR"),Y("ALL"),B("ALL"),I("ALL"),H("ALL")},style:{cursor:"pointer"},className:"mx-2 my-2"}),"Confirmed Cases - Cumulative Number by Municipality:"),l.a.createElement(p.a,{className:"mb-3"},l.a.createElement(p.a.Row,null,l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"Region",onChange:function(e){Y(e.target.value),B("ALL"),I("ALL"),H("ALL")}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"Region"),f.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"Province",onChange:function(e){B(e.target.value),I("ALL"),H("ALL")}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"Province"),h.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"District",onChange:function(e){I(e.target.value),H("ALL")}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"District"),j.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"City",onChange:function(e){return H(e.target.value)}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"City"),M.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))))),l.a.createElement(O.Grid,Object.assign({},a,{skin:"bootstrap",onStateChange:function(e){return V(e.pageSize,e.pageNr,e.orderBy,e.orderDir)}}),l.a.createElement(O.Column,{sortable:!0,header:"NIS5",className:"center bold",field:"niS5"}),l.a.createElement(O.Column,{sortable:!0,header:"Region",field:"tX_RGN_DESCR_".concat(i)}),l.a.createElement(O.Column,{sortable:!0,header:"Province",field:"tX_PROV_DESCR_".concat(i)}),l.a.createElement(O.Column,{sortable:!0,header:"District",field:"tX_ADM_DSTR_DESCR_".concat(i)}),l.a.createElement(O.Column,{sortable:!0,header:"City",field:"tX_DESCR_".concat(i)}),l.a.createElement(O.Column,{sortable:!0,header:"Cases",className:"center bold",field:"cases"})))},R=function(){var e=Object(r.useState)({data:[],loading:!0,pageNr:1,pageSize:10,orderBy:"date",orderDir:"DESC"}),t=Object(y.a)(e,2),a=t[0],c=t[1],o=Object(r.useState)([]),s=Object(y.a)(o,2),i=s[0],m=s[1],d=Object(r.useState)([]),g=Object(y.a)(d,2),f=g[0],E=g[1],b=Object(r.useState)(["ALL"]),C=Object(y.a)(b,2),h=C[0],S=C[1],D=Object(r.useState)(["ALL"]),v=Object(y.a)(D,2),j=v[0],L=v[1],A=Object(r.useState)(""),x=Object(y.a)(A,2),F=x[0],_=x[1],R=Object(r.useState)(""),B=Object(y.a)(R,2),k=B[0],w=B[1],G=function(e,t,r,l){c(Object.assign(a,{loading:!0})),n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetCasesDateHosp"),pageNr:t,pageSize:e,orderBy:r,orderDir:l,filter:{startDate:F?new M.a(F).format("YYYY-MM-DD"):"",endDate:k?new M.a(k).format("YYYY-MM-DD"):"",region:j,province:h}},(function(a,n){c({loading:!1,data:a,dataCount:n,pageNr:t,pageSize:e,orderBy:r,orderDir:l,emptyPlaceholder:"-"})}))};return Object(r.useEffect)((function(){n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateHosp&field=region")},(function(e){return m(e)})),G(a.pageSize,a.pageNr,a.orderBy,a.orderDir)}),[F,k,j,h]),Object(r.useEffect)((function(){n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateASP&field=province&re=").concat(j)},(function(e){return E(e)}))}),[j]),l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Confirmed Cases - Hospitalisations"),l.a.createElement(p.a,{className:"mb-3"},l.a.createElement(p.a.Row,null,l.a.createElement(u.a,null,l.a.createElement(N.a,{selectsStart:!0,startDate:F,endDate:k,placeholderText:"From Date",className:"form-control",selected:F,onChange:function(e){return _(e)},dateFormat:"yyyy-MM-dd",isClearable:!0})),l.a.createElement(u.a,null,l.a.createElement(N.a,{selectsEnd:!0,startDate:F,endDate:k,placeholderText:"To Date",className:"form-control",selected:k,onChange:function(e){return w(e)},dateFormat:"yyyy-MM-dd",isClearable:!0})),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"Region",onChange:function(e){L(e.target.value),S("ALL")}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"Region"),i.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"Province",onChange:function(e){return S(e.target.value)}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"Province"),f.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))),l.a.createElement(u.a,{md:4}))),l.a.createElement(O.Grid,Object.assign({},a,{skin:"bootstrap",onStateChange:function(e){return G(e.pageSize,e.pageNr,e.orderBy,e.orderDir)}}),l.a.createElement(O.Column,{sortable:!0,header:"Date",className:"italic",field:"date"}),l.a.createElement(O.Column,{sortable:!0,header:"Region",className:"center bold",field:"region"}),l.a.createElement(O.Column,{sortable:!0,header:"Province",className:"center bold",field:"province"}),l.a.createElement(O.Column,{sortable:!0,header:"Reporting",className:"center",field:"nR_REPORTING"}),l.a.createElement(O.Column,{sortable:!0,header:"IN",className:"center",field:"totaL_IN"}),l.a.createElement(O.Column,{sortable:!0,header:"ICU",className:"center",field:"totaL_IN_ICU"}),l.a.createElement(O.Column,{sortable:!0,header:"RESP",className:"center",field:"totaL_IN_RESP"}),l.a.createElement(O.Column,{sortable:!0,header:"ECMO",className:"center",field:"totaL_IN_ECMO"}),l.a.createElement(O.Column,{sortable:!0,header:"NEW IN",className:"center",field:"neW_IN"}),l.a.createElement(O.Column,{sortable:!0,header:"NEW OUT",className:"center",field:"neW_OUT"})))},B=function(){var e=Object(r.useState)({data:[],loading:!0,pageNr:1,pageSize:10,orderBy:"date",orderDir:"DESC"}),t=Object(y.a)(e,2),a=t[0],c=t[1],o=Object(r.useState)([]),s=Object(y.a)(o,2),i=s[0],m=s[1],d=Object(r.useState)([]),g=Object(y.a)(d,2),f=g[0],E=g[1],b=Object(r.useState)([]),C=Object(y.a)(b,2),h=C[0],S=C[1],D=Object(r.useState)(["ALL"]),v=Object(y.a)(D,2),j=v[0],L=v[1],A=Object(r.useState)(""),x=Object(y.a)(A,2),F=x[0],_=x[1],R=Object(r.useState)(""),B=Object(y.a)(R,2),k=B[0],w=B[1],G=Object(r.useState)("ALL"),Y=Object(y.a)(G,2),P=Y[0],z=Y[1],T=Object(r.useState)("ALL"),I=Object(y.a)(T,2),U=I[0],W=I[1],X=function(e,t,r,l){c(Object.assign(a,{loading:!0})),n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetCasesDateMort"),pageNr:t,pageSize:e,orderBy:r,orderDir:l,filter:{startDate:F?new M.a(F).format("YYYY-MM-DD"):"",endDate:k?new M.a(k).format("YYYY-MM-DD"):"",region:j,ageGroup:P,sex:U}},(function(a,n){c({loading:!1,data:a,dataCount:n,pageNr:t,pageSize:e,orderBy:r,orderDir:l,emptyPlaceholder:"-"})}))};return Object(r.useEffect)((function(){n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateMort&field=region")},(function(e){return m(e)})),n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateMort&field=ageGroup")},(function(e){return E(e)})),n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetFilterData?type=CasesDateMort&field=sex")},(function(e){return S(e)})),X(a.pageSize,a.pageNr,a.orderBy,a.orderDir)}),[F,k,j,P,U]),l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Confirmed Cases - Mortality"),l.a.createElement(p.a,{className:"mb-3"},l.a.createElement(p.a.Row,null,l.a.createElement(u.a,null,l.a.createElement(N.a,{selectsStart:!0,startDate:F,endDate:k,placeholderText:"From Date",className:"form-control",selected:F,onChange:function(e){return _(e)},dateFormat:"yyyy-MM-dd",isClearable:!0})),l.a.createElement(u.a,null,l.a.createElement(N.a,{selectsEnd:!0,startDate:F,endDate:k,placeholderText:"To Date",className:"form-control",selected:k,onChange:function(e){return w(e)},dateFormat:"yyyy-MM-dd",isClearable:!0})),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"Region",onChange:function(e){L(e.target.value)}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"Region"),i.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"Age Group",onChange:function(e){return z(e.target.value)}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"Age Group"),f.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))),l.a.createElement(u.a,null,l.a.createElement(p.a.Control,{as:"select",placeholder:"Sex",onChange:function(e){return W(e.target.value)}},l.a.createElement(p.a.Control,{as:"option",value:"ALL"},"Sex"),h.map((function(e){return l.a.createElement(p.a.Control,{as:"option",key:e,value:e},e)})))),l.a.createElement(u.a,{md:2}))),l.a.createElement(O.Grid,Object.assign({},a,{skin:"bootstrap",onStateChange:function(e){return X(e.pageSize,e.pageNr,e.orderBy,e.orderDir)}}),l.a.createElement(O.Column,{sortable:!0,header:"Date",className:"italic",field:"date"}),l.a.createElement(O.Column,{sortable:!0,header:"Region",className:"center bold",field:"region"}),l.a.createElement(O.Column,{sortable:!0,header:"Age",className:"center",field:"agegroup"}),l.a.createElement(O.Column,{sortable:!0,header:"Sex",className:"center",field:"sex"}),l.a.createElement(O.Column,{sortable:!0,header:"Deaths",className:"center",field:"deaths"})))},k=function(){var e=Object(r.useState)({data:[],loading:!0,pageNr:1,pageSize:10,orderBy:"date",orderDir:"DESC"}),t=Object(y.a)(e,2),a=t[0],c=t[1],o=Object(r.useState)(""),s=Object(y.a)(o,2),i=s[0],m=s[1],d=Object(r.useState)(""),g=Object(y.a)(d,2),f=g[0],E=g[1],b=function(e,t,r,l){c(Object.assign(a,{loading:!0})),n.get({url:"".concat("http://covid19.textgate.net","/Stats/GetCasesDateTests"),pageNr:t,pageSize:e,orderBy:r,orderDir:l,filter:{startDate:i?new M.a(i).format("YYYY-MM-DD"):"",endDate:f?new M.a(f).format("YYYY-MM-DD"):""}},(function(a,n){c({loading:!1,data:a,dataCount:n,pageNr:t,pageSize:e,orderBy:r,orderDir:l,emptyPlaceholder:"-"})}))};return Object(r.useEffect)((function(){b(a.pageSize,a.pageNr,a.orderBy,a.orderDir)}),[i,f]),l.a.createElement(l.a.Fragment,null,l.a.createElement("h1",null,"Total Tests"),l.a.createElement(p.a,{className:"mb-3"},l.a.createElement(p.a.Row,null,l.a.createElement(u.a,null,l.a.createElement(N.a,{selectsStart:!0,startDate:i,endDate:f,placeholderText:"From Date",className:"form-control",selected:i,onChange:function(e){return m(e)},dateFormat:"yyyy-MM-dd",isClearable:!0})),l.a.createElement(u.a,null,l.a.createElement(N.a,{selectsEnd:!0,startDate:i,endDate:f,placeholderText:"To Date",className:"form-control",selected:f,onChange:function(e){return E(e)},dateFormat:"yyyy-MM-dd",isClearable:!0})),l.a.createElement(u.a,{md:8}))),l.a.createElement(O.Grid,Object.assign({},a,{skin:"bootstrap",onStateChange:function(e){return b(e.pageSize,e.pageNr,e.orderBy,e.orderDir)}}),l.a.createElement(O.Column,{sortable:!0,header:"Date",className:"italic",field:"date"}),l.a.createElement(O.Column,{sortable:!0,header:"Tests",className:"center",field:"tests"})))},w=a(59),G=a(58);var Y=function(){return l.a.createElement(s.a,{className:"app"},l.a.createElement(i.a,null,l.a.createElement(u.a,{className:"p-0"},l.a.createElement(m.a,{bg:"dark",variant:"dark",expand:"lg"},l.a.createElement(m.a.Brand,{href:"/"},l.a.createElement("img",{src:"images/be_flag.png",width:"40",className:"mr-2",alt:"Belgium"}),"Covid-19 - Belgium Stats"),l.a.createElement(m.a.Toggle,{"aria-controls":"basic-navbar-nav"}),l.a.createElement(m.a.Collapse,{id:"basic-navbar-nav"},l.a.createElement(d.a,{className:"mr-auto"},l.a.createElement(g.a,{title:"Confirmed cases",id:"basic-nav-dropdown"},l.a.createElement(C,{className:"dropdown-item",to:"/cases_date_asp"},l.a.createElement(w.FontAwesomeIcon,{className:"mr-2",icon:G.faUsers}),"By Date, Age, Sex and Province"),l.a.createElement(C,{className:"dropdown-item",to:"/cases_date_mun"},l.a.createElement(w.FontAwesomeIcon,{className:"mr-2",icon:G.faMapMarked}),"By Date and Municipality"),l.a.createElement(g.a.Divider,null),l.a.createElement(C,{className:"dropdown-item",to:"/cases_cum_mun"},l.a.createElement(w.FontAwesomeIcon,{className:"mr-2",icon:G.faMap}),"Cumulative by municipality")),l.a.createElement(C,{className:"nav-link",to:"/hosp"},l.a.createElement(w.FontAwesomeIcon,{className:"mr-2",icon:G.faUserNurse}),"Hospitalisations"),l.a.createElement(C,{className:"nav-link",to:"/mortality"},l.a.createElement(w.FontAwesomeIcon,{className:"mr-2",icon:G.faSkullCrossbones}),"Mortality"),l.a.createElement(C,{className:"nav-link",to:"/tests"},l.a.createElement(w.FontAwesomeIcon,{className:"mr-2",icon:G.faVial}),"Tests")),l.a.createElement(p.a,{inline:!0,hidden:!0},l.a.createElement(f.a,{type:"text",placeholder:"Search",className:"mr-sm-2"}),l.a.createElement(E.a,{variant:"outline-success"},"Search")))))),l.a.createElement(i.a,null,l.a.createElement(u.a,{className:"py-4"},l.a.createElement(S.d,null,l.a.createElement(S.b,{path:"/",exact:!0,component:v}),l.a.createElement(S.b,{path:"/cases_date_asp",component:x}),l.a.createElement(S.b,{path:"/cases_date_mun",component:F}),l.a.createElement(S.b,{path:"/cases_cum_mun",component:_}),l.a.createElement(S.b,{path:"/hosp",component:R}),l.a.createElement(S.b,{path:"/mortality",component:B}),l.a.createElement(S.b,{path:"/tests",component:k}),l.a.createElement(S.b,{path:"/not-found",component:h}),l.a.createElement(D,{to:"/not-found"})))),l.a.createElement(i.a,null,l.a.createElement(u.a,{className:"footer"},"Source of data: ",l.a.createElement("a",{href:"https://epistat.wiv-isp.be/Covid/",target:"_balnk"},"https://epistat.wiv-isp.be/Covid/")," | Source code: ",l.a.createElement("a",{href:"https://github.com/miscalencu/Covid-Stats-Belgium",taget:"_blank"},"https://github.com/miscalencu/Covid-Stats-Belgium"),l.a.createElement("a",{className:"float-right",href:"https://epistat.sciensano.be/Data/COVID19BE.xlsx",target:"_blank"},l.a.createElement(w.FontAwesomeIcon,{className:"mr-2",icon:G.faFileExcel}),"Excel Data"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var P=b.b;o.a.render(l.a.createElement(P,{basename:"".concat("/Covid-Stats-Belgium","/")},l.a.createElement(Y,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[331,1,2]]]);
//# sourceMappingURL=main.72c5e434.chunk.js.map
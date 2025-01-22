(()=>{window.Webflow||=[];window.Webflow.push(()=>{gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);let e="power3.out",t=0,o=300;gsap.to(".nav",{y:"-100%",ease:e,duration:.3,scrollTrigger:{start:"top top",end:"bottom bottom",onUpdate:i=>{let r=Math.max(i.scroll(),0);r<=o?gsap.to(".nav",{y:"0%",ease:e,duration:.3}):r>t?gsap.to(".nav",{y:"-100%",ease:e,duration:.6}):gsap.to(".nav",{y:"0%",ease:e,duration:.3}),t=r},scrub:!1}}),gsap.utils.toArray(".w-dyn-item img").forEach(i=>{gsap.fromTo(i,{scale:.5},{scale:1,scrollTrigger:{trigger:i,start:"top bottom",end:"top 50%",scrub:!0,toggleActions:"restart pause reverse pause"},ease:e})})});$("#homeCareers").children(".w-dyn-empty").length>0&&($("#homeCareers").hide(),console.log("Home Careers section hidden"));$(".drawings-list").each(function(){$(this).children(".w-dyn-item").length===1&&$(this).css("display","block")});$(".cta-button.book-training, .cta-button.buy-used").click(function(){$(".quote-trigger").click()});$(".key-spec-text.unit").each(function(){$(this).text()===""&&$(this).remove()});var H={"Articulated Diesel Boom Lifts":["working-height","horizontal-outreach","working-outreach","up-over-height","machine-weight"],"Compact Crawlers":["working-height","horizontal-outreach","working-outreach","machine-weight","platform-capacity-unrestricted"],"Diesel Scissor Lifts":["working-height","machine-weight","platform-capacity-unrestricted","deck-extension","turning-radius-inside","turning-radius-outside"],"E - Trucks":["power-unit","load-capacity","load-centre","free-lift","overall-width"],"Electric Boom Lifts":["working-height","horizontal-outreach","working-outreach","machine-weight"],"Electric Scissor Lifts":["working-height","horizontal-outreach","working-outreach","up-over-height","machine-weight"],"High Capacity Telehandlers":["horizontal-outreach","machine-weight","rated-capacity","max-lift-capacity-at-full-height-forks","max-lift-capacity-at-maximum-reach-forks"],"IC - Trucks":["power-unit","load-capacity","load-centre","free-lift","overall-width"],"Mast Boom Lifts":["working-height","horizontal-outreach","up-over-height","machine-weight","drive-speed-2"],"Mini Cranes":["horizontal-outreach","machine-weight","rated-capacity","max-lift-height","maximum-working-radius"],"Order Pickers":["power-unit","load-capacity","load-centre","overall-width"],"Pallet Stackers":["power-unit","load-capacity","load-centre","free-lift","overall-width","lift-hight"],"Pallet Trucks":["power-unit","load-capacity","load-centre","overall-width"],"Personnel Lifts":["working-height","machine-weight"],"Reach Trucks":["power-unit","load-capacity","load-centre","free-lift","overall-width","lift-hight"],"Rotational Telehandlers":["horizontal-outreach","machine-weight","rated-capacity","max-lift-capacity-at-full-height-stabilizers-down","max-lift-capacity-at-maximum-reach-stabilizers-down","max-lift-height"],"Rough Terrain Forklifts":["machine-weight","load-capacity","load-centre","free-lift"],"Skid Steer: Small Platforms":["dump-reach","working-height","machine-weight","turning-radius-outside"],Telehandlers:["horizontal-outreach","machine-weight","rated-capacity","max-lift-height"],"Telescopic Diesel Boom Lifts":["working-height","horizontal-outreach","working-outreach","machine-weight","platform-capacity-unrestricted"],"Tow Tractors & Platform Trucks":["power-unit","load-capacity","overall-width"],"Trailer Mounted Boom Lifts (Towable)":["working-height","working-outreach","up-over-height","machine-weight"],"Very Narrow Aisle Trucks":["power-unit","load-capacity","load-centre","overall-width","lift-hight"]};$(".key-spec-list[data-category]").each(function(){let e=$(this),t=e.attr("data-category"),o=H[t]||[];e.children("li").each(function(){let i=$(this);o.some(p=>i.hasClass(p))||!i.attr("class")?i.show():i.hide()})});$(".pdf-wrap").each(function(){$(this).children(":visible").length===0&&$(this).hide()});if(window.location.href.indexOf("high-capacity-telehandlers")>-1){let e=$(".grid-4 .w-dyn-item");e.sort(function(t,o){let i=parseFloat($(t).find(".horizontal-outreach .key-spec-text").text());return parseFloat($(o).find(".horizontal-outreach .key-spec-text").text())-i}),$(".grid-4").html(e)}if(window.location.href.indexOf("rotational-telehandlers")>-1){let e=$(".grid-4 .w-dyn-item");e.sort(function(t,o){let i=parseFloat($(t).find(".rated-capacity .key-spec-text").text());return parseFloat($(o).find(".rated-capacity .key-spec-text").text())-i}),$(".grid-4").html(e)}if(window.location.href.indexOf("rough-terrain-forklifts")>-1){let e=$(".grid-4 .w-dyn-item");e.sort(function(t,o){let i=parseFloat($(t).find(".load-capacity .key-spec-text").text());return parseFloat($(o).find(".load-capacity .key-spec-text").text())-i}),$(".grid-4").html(e)}if(window.location.href.indexOf("skid-steer-small-platforms")>-1){let e=$(".grid-4 .w-dyn-item");e.sort(function(t,o){let i=parseFloat($(t).find(".working-height .key-spec-text").text());return parseFloat($(o).find(".working-height .key-spec-text").text())-i}),$(".grid-4").html(e)}$(".jsontraining").each(function(){let e=JSON.parse($(this).text().trim());e&&e.course&&$("#trainingCourses").append(`<option value="${e.course}">${e.course}</option>`)});$(".jsonbranch").each(function(e){let t=$(this).text().trim();try{let o=JSON.parse(t);o&&o.branch&&o.name?$("#chooseBranch").append(`<option value="${o.branch}">${o.name}</option>`):console.warn(`Missing "branch" property (index ${e}):`,o)}catch(o){console.error(`Error parsing JSON (index ${e}):`,t,o)}});var O=window.location.href;$("#currentUrl").val(O);$(".form-section").hide();$("#quoteWhat").show();$("#Machine-Name, #partsServiceRequirements, #trainingCourses").on("input change",function(){let e=$("#Machine-Name").val(),t=$("#partsServiceRequirements").val(),o=$("#trainingCourses").val();t||o?$("#quoteBranch").show():$("#quoteBranch").hide()});function d(e){let t=$(".form-block")[0],o=$(`#${e}`)[0];if(t&&o){let i=o.offsetTop-t.offsetTop;gsap.to(t,{scrollTop:i-20,duration:1.8,ease:"power3.out"})}}function P(){let e=$('input[name="what-to-quote"]:checked').attr("id");switch($(".form-section").hide(),$("#quoteWhat").show(),e){case"chooseRental":case"chooseNew":case"chooseUsed":case"chooseNewUsed":$("#quoteRentBuy").show(),d("quoteRentBuy");break;case"choosePartsService":$("#quotePartsService").show(),d("quotePartsService");break;case"chooseTraining":$("#quoteTraining").show(),d("quoteTraining");break;default:break}}function I(){let e=$('input[name="what-you-need"]:checked').attr("id");e==="iKnowHWhatINeed"?($("#quoteMoving, #quoteLocation, #quoteMaxHeight, #quoteMaxWeight, #quoteDates, #quoteBranch").hide(),$("#quoteKnow").show(),d("quoteKnow"),$("#quoteKnow input").on("change",function(){$("#chooseRental").is(":checked")&&($("#quoteDates").show(),d("quoteDates"))})):e==="helpMeChoose"&&($("#quoteKnow").hide(),$("#quoteMoving").show(),d("quoteMoving"),$("#quoteMoving input").on("change",function(){$("#quoteLocation").show(),d("quoteLocation")}),$("#quoteLocation input").on("change",function(){$("#quoteMaxHeight").show(),d("quoteMaxHeight")}),$("#quoteMaxHeight input").on("change",function(){$("#quoteMaxWeight").show(),d("quoteMaxWeight")}),$("#chooseRental").is(":checked")||$("#chooseNew").is(":checked")||$("#chooseUsed").is(":checked")?($("#quoteMaxWeight input").on("change",function(){$("#quoteBranch").show(),d("quoteBranch")}),$("#quoteKnow input").on("change",function(){$("#quoteBranch").show(),d("quoteBranch")})):$("#quoteMaxWeight input").on("change",function(){$("#quoteBranch").show(),d("quoteBranch")}))}$("#siteAddress").on("focus",function(){$("#quoteBranch").show(),d("quoteBranch"),console.log("siteAddress focused")});function z(){$('input[name="groupTraining"]:checked').length>0?($("#quoteBranch").show(),d("quoteBranch")):$("#quoteBranch, #quoteDetails, #quoteSubmit").hide()}function D(){if(F("quoteBranch"))$("#quoteDetails").show(),d("quoteDetails");else{$("#quoteDetails, #quoteSubmit").hide();return}F("quoteDetails")?($("#quoteSubmit").show(),d("quoteSubmit")):$("#quoteSubmit").hide()}function F(e){let t=!0;return $(`#${e}`).find("input[required], textarea[required], select[required]").each(function(){if(!$(this).val()||$(this).attr("type")==="radio"&&!$(`input[name="${$(this).attr("name")}"]:checked`).length)return t=!1,!1}),t}$('input[name="what-to-quote"]').on("change",P);$('input[name="what-you-need"]').on("change",I);$('input[name="groupTraining"]').on("change",z);$("#quoteBranch input, #quoteBranch select, #quoteBranch textarea").on("change keyup",D);$("#quoteDetails input, #quoteDetails select, #quoteDetails textarea").on("change keyup",D);$(".quote-trigger").on("click",function(){gsap.to(".quote-modal",{autoAlpha:1,duration:.4,ease:"power3.out",onStart:function(){$(".quote-modal").css("display","flex")}}),$("body").addClass("no-scroll")});$(".quote-close, .quote-bg, .quaote-success").on("click",function(){gsap.to(".quote-modal",{autoAlpha:0,duration:.4,ease:"power3.in",onComplete:function(){$(".quote-modal").css("display","none")}}),$("body").removeClass("no-scroll")});$('input[type="radio"]').on("change",function(){var e=$(this).attr("name");$('input[name="'+e+'"]').closest(".radio-button-field").removeClass("active"),$(this).closest(".radio-button-field").addClass("active"),$('input[name="'+e+'"]').each(function(){var t=$(this).closest(".radio-button-field").find(".field-icon"),o=$(this).closest(".radio-button-field").find(".field-icon-active");$(this).is(":checked")?(gsap.to(o,{scale:1,opacity:1,duration:.4,ease:"power3.out"}),gsap.to(t,{scale:0,opacity:0,duration:.2,ease:"power3.out"})):(gsap.to(o,{scale:0,opacity:0,duration:.2,ease:"power3.out"}),gsap.to(t,{scale:1,opacity:1,duration:.2,ease:"power3.out"}))})});$(".text-field, .textarea").removeClass("active").siblings(".field-label").removeClass("active");$(".text-field, .textarea").on("focus",function(){$(this).addClass("active").siblings(".field-label").addClass("active")});$(".text-field, .textarea").on("blur",function(){$(this).val().trim()===""&&$(this).removeClass("active").siblings(".field-label").removeClass("active")});(function(){$(".radio-button-field").removeClass("disabled"),$("#findLocation, #findMaxHeight, #findMaxWeight, #findLast").hide();let e=document.getElementById("wf-form-Find-Form"),t=document.getElementById("findSubmit"),o=document.querySelectorAll(".jsonmachine script.jsonmachine"),i=Array.from(o).map(n=>JSON.parse(n.textContent));function r(n,c){n.classList.toggle("disabled",!c);let s=n.querySelector("input");s.disabled=!c,n.style.opacity=c?"1":"0.5"}function p(n){n.reset(),n.querySelectorAll(".radio-button-field").forEach(a=>r(a,!0));let s=document.getElementById("reset-button");s&&s.remove()}function w(){let n=new FormData(e),c=n.get("find-lifting"),s=n.get("find-location"),a=n.get("find-height"),u=n.get("find-weight");if(!c||!s)return;let f=c.includes("People"),b=c.includes("Material"),q=s.includes("Indoor"),v=s.includes("Outdoor"),h=i.filter(l=>(f?l.people:!0)&&(b?l.material:!0)&&(q?l.indoor:!0)&&(v?l.outdoor:!0)&&(!a||l.height===a)&&(!u||l.weight===u));h.forEach(l=>{});let m=new Set(h.map(l=>l.height)),S=new Set(h.map(l=>l.weight));y("find-height",m),y("find-weight",S)}function y(n,c){e.querySelectorAll(`input[name="${n}"]`).forEach(a=>{let u=a.closest(".radio-button-field"),f=c.has(a.value);r(u,f),!f&&a.checked&&(a.checked=!1)})}w(),e.addEventListener("change",n=>{if(n.target.name==="find-lifting"){let c=e.querySelectorAll('.radio-button-field input[name="find-height"]'),s=e.querySelectorAll('.radio-button-field input[name="find-weight"]');c.forEach(a=>{a.checked=!1,r(a.closest(".radio-button-field"),!0)}),s.forEach(a=>{a.checked=!1,r(a.closest(".radio-button-field"),!0)}),$("#findLifting").find(".radio-button-field").removeClass("active"),$("#findMaxHeight").find(".radio-button-field").removeClass("active"),$("#findMaxWeight").find(".radio-button-field").removeClass("active"),n.target.closest(".radio-button-field").classList.add("active")}if(n.target.name==="find-location"){let c=e.querySelectorAll('.radio-button-field input[name="find-height"]'),s=e.querySelectorAll('.radio-button-field input[name="find-weight"]');c.forEach(a=>{a.checked=!1,r(a.closest(".radio-button-field"),!0)}),s.forEach(a=>{a.checked=!1,r(a.closest(".radio-button-field"),!0)}),$("#findLocation").find(".radio-button-field").removeClass("active"),$("#findMaxHeight").find(".radio-button-field").removeClass("active"),$("#findMaxWeight").find(".radio-button-field").removeClass("active"),n.target.closest(".radio-button-field").classList.add("active")}["find-lifting","find-location","find-height","find-weight"].includes(n.target.name)&&w()});function g(n){let c=$("#findFormBlock")[0],s=$(`#${n}`)[0];if(c&&s){let a=s.offsetTop-c.offsetTop;gsap.to(c,{scrollTop:a-20,duration:.4,ease:"power3.out"})}}e.addEventListener("change",n=>{n.target.name==="find-lifting"&&($("#findLocation").show(),g("findLocation")),n.target.name==="find-location"&&($("#findMaxHeight").show(),g("findMaxHeight")),n.target.name==="find-height"&&($("#findMaxWeight").show(),g("findMaxWeight")),n.target.name==="find-weight"&&($("#findLast").show(),g("findLast"))}),t.addEventListener("click",function(n){n.preventDefault(),t.textContent="Loading...";let c=new FormData(e),s=c.get("find-lifting"),a=c.get("find-location"),u=c.get("find-height"),f=c.get("find-weight");if(!s||!a){alert('Please select both "What are you moving?" and "Where are you working?" options.');return}let b=e.querySelector('input[name="find-height"]:checked'),q=e.querySelector('input[name="find-weight"]:checked'),v=!1;if((b&&b.disabled||q&&q.disabled)&&(v=!0),v){if(alert("The selected combination of options is not possible. Please adjust your selections."),!document.getElementById("reset-button")){let x=document.createElement("button");x.type="button",x.id="reset-button",x.textContent="Reset Form",x.style.marginTop="10px",x.addEventListener("click",()=>p(e)),e.appendChild(x)}return}let h="";a.includes("Indoor")&&a.includes("Outdoor")?h="indoor-outdoor":a.includes("Indoor")?h="indoor":a.includes("Outdoor")&&(h="outdoor");let m=[h];s.includes("People")&&s.includes("Material")?m.push("work-at-height-material-handling"):s.includes("People")?m.push("work-at-height"):s.includes("Material")&&m.push("material-handling");let l=`/find-equipment/${m.join("-")}`,k=new URLSearchParams;u&&k.append("height",u),f&&k.append("weight",f);let C=k.toString(),M=C?`${l}?${C}`:l;window.location.href=M}),e.addEventListener("click",n=>{if(n.target.name==="find-height"||n.target.name==="find-weight"){if(n.target.closest(".radio-button-field").classList.contains("not-sure"))return;n.target.disabled&&(n.preventDefault(),alert(`This ${n.target.name.split("-")[1]} option is not available for your current selections.`))}}),document.getElementById("findReset").addEventListener("click",function(){p(e),$(e).find(".radio-button-field").removeClass("active"),$(e).find(".radio-button-field .field-icon").css({scale:"1",opacity:"1",transform:"scale(1)"}),$(e).find(".radio-button-field .field-icon-active").css({scale:"0",opacity:"0",transform:"scale(0)"}),$("#findLocation, #findMaxHeight, #findMaxWeight, #findLast").hide(),g("findLifting")}),window.location.pathname.includes("/find-equipment/")&&document.addEventListener("DOMContentLoaded",function(){function n(){let s=new URLSearchParams(window.location.search),a={};for(let[u,f]of s.entries())a[u]=f;return a}function c(){let s=n(),a=s.height?parseFloat(s.height):null,u=s.weight?parseFloat(s.weight):null,f=document.querySelectorAll(".grid-4 .w-dyn-item"),b=0;f.forEach(v=>{let h=v.querySelector(".hide");if(!h)return;let m=h.querySelector("[data-height]"),S=h.querySelector("[data-weight]"),l=m?parseFloat(m.getAttribute("data-height")):null,k=S?parseFloat(S.getAttribute("data-weight")):null;if(l===null||k===null)return;let C=!0,M=!0;a!==null&&(C=l<=a),u!==null&&(M=k<=u),C&&M&&(v.classList.remove("hide"),b++)});let q=document.getElementById("no-results");q&&(q.style.display=b===0?"block":"none"),a&&$(".filtered-height").text("Filtered by Max Working Height = "+a+" m"),u&&$(".filtered-weight").text("Filtered by Max Lifting Weight = "+u+" kg"),!a&&!u&&$(".filtered-by").hide()}c()})})();$(".news-list-link").each(function(){var e=$(this).html();e=e.replace(/ (\S+)$/,"&nbsp;$1"),$(this).html(e)});var A=document.querySelector(".country-modal"),U=document.querySelectorAll(".button-country"),E=document.querySelector(".country-list");E?E.addEventListener("click",e=>{let t=e.target.closest(".nav_dropdown_link");if(t){let o=t.querySelector(".country"),i=t.querySelector(".country-short"),r=t.querySelector("img");if(o&&i&&r){let p=o.textContent.trim(),w=i.textContent.trim(),y=r.src;W(p,w,y)}}}):console.error("Navigation dropdown '.country-list' not found.");var L=T("selectedCountry"),R=T("selectedCountryShort"),V=T("selectedCountryFlag");!L||!R||!V?(j(A),U.forEach(e=>{e.addEventListener("click",()=>{let t=e.textContent.trim(),o=[...E.querySelectorAll(".nav_dropdown_item")].find(i=>i.querySelector(".country")?.textContent.trim()===t);if(o){let i=o.querySelector(".country-short").textContent.trim(),r=o.querySelector("img").src;W(t,i,r),K(A)}else console.error(`Dropdown item for ${t} not found.`)})})):N(L,R,V);function j(e){e?(e.style.display="flex",document.body.classList.add("no-scroll")):console.error("Modal element not found.")}function K(e){e?(e.style.display="none",document.body.classList.remove("no-scroll")):console.error("Modal element not found.")}function B(e,t,o){let i=new Date;i.setTime(i.getTime()+o*24*60*60*1e3);let r="expires="+i.toUTCString();document.cookie=e+"="+t+";"+r+";path=/"}function T(e){let t=e+"=",o=document.cookie.split(";");for(let i=0;i<o.length;i++){let r=o[i].trim();if(r.indexOf(t)===0)return r.substring(t.length,r.length)}return null}function W(e,t,o){B("selectedCountry",e,365),B("selectedCountryShort",t,365),B("selectedCountryFlag",o,365),N(e,t,o)}function N(e,t,o){let i=document.querySelector(".short-chosen"),r=document.querySelector(".flag-chosen");i?i.textContent=t:console.error("Element with class 'short-chosen' not found."),r?r.src=o:console.error("Element with class 'flag-chosen' not found.")}function J(e){let t=$(".button-rent-buy"),o=t.find("[data-rent]").attr("data-rent")||"",i=t.find("[data-sale]").attr("data-sale")||"",r=o.split(",").map(g=>g.trim()),p=i.split(",").map(g=>g.trim()),w=r.includes(e),y=p.includes(e);w&&y?t.show().text("Available to Rent / Buy"):w?t.show().text("Available to Rent"):y?t.show().text("Available to Buy"):t.show().text("Not Available to Rent / Buy in "+e)}L&&J(L);$(".lang-select").on("click",function(){var e=$(this).data("lang");document.cookie="googtrans=/en/"+e,location.reload()});function Q(){var e=document.cookie.match(/googtrans=([^;]+)/);if(e){var t=e[1].split("/")[1];t&&($(".goog-te-combo").val(t),$(".goog-te-combo").trigger("change"))}}$(window).on("load",Q);document.addEventListener("DOMContentLoaded",function(){document.querySelectorAll("a[href^='/'], a[href^='./'], a[href^='../']").forEach(t=>{t.addEventListener("mouseover",()=>{let o=t.getAttribute("href");if(o){if(!t.dataset.preloaded){t.dataset.preloaded="true";let i=document.createElement("link");i.rel="prefetch",i.href=o,i.as="document",document.head.appendChild(i)}}else console.warn("Href attribute is not defined for this link",t)})})});})();
//# sourceMappingURL=index.js.map

"use strict";(self.webpackChunksamurai_way=self.webpackChunksamurai_way||[]).push([[915],{7284:function(e,s,a){a.d(s,{D:function(){return l}});var r=a(1413),n=a(5987),t=(a(2791),a(9271)),i=a(364),d=a(184),o=["isAuth"],c=function(e){return{isAuth:e.auth.isAuth}};function l(e){return(0,i.$j)(c)((function(s){var a=s.isAuth,i=(0,n.Z)(s,o);return a?(0,d.jsx)(e,(0,r.Z)({},i)):(0,d.jsx)(t.l_,{to:"/login"})}))}},5915:function(e,s,a){a.r(s),a.d(s,{default:function(){return k}});var r=a(4546),n=(a(2791),{dialogs:"Messages_dialogs__z6UOG",dialogsItems:"Messages_dialogsItems__Go8ZG",dialog:"Messages_dialog__z-NQH",active:"Messages_active__0rFY0",addMessageBlock:"Messages_addMessageBlock__Rr5P5",messages:"Messages_messages__fzg+v"}),t=a(1523),i=a(184),d=function(e){var s="/messages/"+e.id;return(0,i.jsx)("div",{className:n.dialog+" "+n.active,children:(0,i.jsx)(t.OL,{to:s,children:e.name})})},o=function(e){return(0,i.jsx)("div",{className:n.message,children:e.message})},c=a(1413),l=a(1134),u=a(4695),g=a(8928),m=a(9977),f=a(435),_=a(1694),x=a.n(_),h=a(4297),j={textAreaBlock:"AddMessageForm_textAreaBlock__JTPcO",areaError:"AddMessageForm_areaError__GJ-3K"},v=m.Z.TextArea,M=function(e){var s=e.addNewMessage,a=(0,l.cI)({defaultValues:{newMessageBody:""},resolver:(0,u.X)(g.qD)}),r=a.control,n=a.handleSubmit,t=a.reset,d=a.formState.errors;return(0,i.jsxs)("form",{onSubmit:n((function(e){s(e.newMessageBody),t()})),children:[(0,i.jsxs)("div",{className:j.textAreaBlock,children:[(0,i.jsx)(l.Qr,{control:r,name:"newMessageBody",render:function(e){var s=e.field;return(0,i.jsx)(v,(0,c.Z)({className:j.textArea,placeholder:"Enter your message"},s))}}),d.newMessageBody&&(0,i.jsx)("div",{className:x()(h.Z.error,j.areaError),children:d.newMessageBody.message})]}),(0,i.jsx)(f.Z,{htmlType:"submit",children:"Add message"})]})},A=function(e){var s=e.messagesPage,a=e.sendMessage,r=s.dialogs.map((function(e){return(0,i.jsx)(d,{name:e.name,id:e.id},e.id)})),t=s.messages.map((function(e){return(0,i.jsx)(o,{message:e.message},e.id)}));return(0,i.jsxs)("div",{className:n.dialogs,children:[(0,i.jsx)("div",{className:n.dialogsItems,children:r}),(0,i.jsx)("div",{className:n.messages,children:t}),(0,i.jsx)("div",{className:n.addMessageBlock,children:(0,i.jsx)(M,{addNewMessage:function(e){a(e)}})})]})},N=a(364),w=a(7781),B=a(7284),k=(0,w.qC)((0,N.$j)((function(e){return{messagesPage:e.messagesPage}}),(function(e){return{sendMessage:function(s){e((0,r.dI)(s))}}})),B.D)(A)}}]);
//# sourceMappingURL=915.5bb377cf.chunk.js.map
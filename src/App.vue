<template>
  <div id="app">
    <AnnotationsTool ref="annotationstool"/>
  </div>
</template>

<script>
import AnnotationsTool from './components/AnnotationsTool'

export default {
  name: 'App',
  components: {
    AnnotationsTool
  }
}
</script>

<style>
  html, body, body > .container, #app{
    height: 100%;
  }
  #annotationsTool {
    position: relative;
    height: 100%;
  }
  #annotationsTool > .vueapp {
    display: none;
  }

  .wb-all {
    word-break: break-all;
  }

  .mt-1 {
    margin-top: 5px;
  }
  .mt-2 {
    margin-top: 10px;
  }
  .mt-3 {
    margin-top: 15px;
  }
  .mt-4 {
    margin-top: 20px;
  }
  .mt-5 {
    margin-top: 25px;
  }

  label.normal {
    font-weight: normal;
  }

  .input-group-addon.np {
    padding: 0px;
  }
  .input-group-addon button {
    border: none;
    background: transparent;
    padding: 5px 10px;
  }

  #focuscatch {
    position: absolute;
    top: -50px;
    left: -50px;
    width: 10px;
    height: 10px;
  }

  .infpanel {
    margin-bottom: 10px;
  }
  .infpanel>a, .infpanel>span {
    display: block;
    background: #fff;
    padding: 2px 10px 3px 7px;
    color: #333;
    text-decoration: none;
  }
  .infpanel.open>a, .infpanel.open>span {
    background: #ddd;
    color: #272C31;
  }
  .infpanel.selpanel>span {
    background: #292;
    color: #fff;
  }
  .infpanel>a:hover, .infpanel>a:focus {
    background: #555;
    color: #ddd;
  }
  .infpanel>a>.glyphicon {
    top: 4px;
  }
  .infpanel>div {
    border: 1px solid #ddd;
    padding: 6px;
    font-size: 14px;
    background: #fff;
  }
  .infpanel.selpanel>div {
    border-color: #292;
  }
  .infpanel dl {
    margin-top: 5px;
    margin-left: 9px;
  }
  .infpanel dl>dd {
    margin-left: 8px;
    margin-bottom: 2px;
  }
  .tokensets {
    border-left: 3px solid transparent;
    padding-left: 5px;
    margin-left: -6px;
  }
  .infpanel .tokensets:not(:last-child) {
    border-bottom: 1px solid #ccc;
  }
  .tokensets.selected {
    border-left: 3px solid #0a0;
  }
  .listtokens>a, .listevents>a {
    background: #fff;
    margin-right: 3px;
    margin-bottom: 2px;
    padding: 0px 5px;
    display: inline-block;
    border-radius: 6px;
    border: 1px solid #ddd;
    color: #333;
    text-decoration: none;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .listtokens>a.selected, .listevents>a.selected {
    border-color: #333;
    background: #ddf;
    color: #111;
  }
  .listtokens>a:hover, .listtokens>a:focus, .listevents>a:hover, .listevents>a:focus {
    background: #555;
    color: #ddd;
  }
  button.lmfabc {
    border: none;
  }

  .infpanel .lmfabc {
    background: #eee;
  }
  .infpanel .lmfabc:hover, .infpanel .lmfabc:focus {
    background: #555;
  }

  .btngroup {
    margin-top: 5px;
  }

  .mw-20 {
    position: relative
  }
  .mw-20-el {
    max-width: calc(100% - 26px);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    display: block;
  }
  .mw-20-icon {
    position: absolute;
    right: 9px;
    top: 6px!important;
  }
  .mit10 {
    margin-top: 10px;
  }
  .mib10 {
    margin-top: 10px;
  }
  .mil5 {
    margin-left: 5px;
  }
  .mir5 {
    margin-right: 5px;
  }

  @-moz-keyframes spin {
    0% {
      -moz-transform: rotate(0deg);
    }
    100% {
      -moz-transform: rotate(359deg);
    }
  }
  @-webkit-keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
    }
  }
  @-o-keyframes spin {
    0% {
      -o-transform: rotate(0deg);
    }
    100% {
      -o-transform: rotate(359deg);
    }
  }
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(359deg);
      transform: rotate(359deg);
    }
  }
</style>

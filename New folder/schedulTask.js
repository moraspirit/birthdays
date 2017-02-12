

    /** set relevant time to run  */

var schedule=require('node-schedule');
var rule=new schedule.RecurrenceRule();
rule.hour=null;
rule.minute=null;
rule.second=1;

var task=schedule.scheduleJob(rule,function(){

    var runs=require('./app');
    runs.appJS();


});


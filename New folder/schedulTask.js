/**
 * Created by Dell-Pc on 9/29/2016.
 */

var schedule=require('node-schedule');
var rule=new schedule.RecurrenceRule();
rule.hour=null;
rule.minute=null;
rule.second=2;

var task=schedule.scheduleJob(rule,function(){

    var runs=require('./app');
    runs.appJS();


});


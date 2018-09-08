// ==UserScript==
// @name         block 'drop' in steam.tv
// @version      1.1
// @description  block noob!
// @author       xz
// @include      *://steam.tv/*
// @grant        none
// @namespace https://greasyfork.org/users/48754
// ==/UserScript==

(function() {
    'use strict';
    if(typeof CBroadcastChat !== 'undefined'){
        console.log("find CBroadcastChat!");
        CBroadcastChat.prototype.DisplayChatMessage = function( strPersonaName, bInGame, steamID, strMessage, bLocal )
        {
            var _chat = this;

            var elMessage = $J('#ChatMessageTemplate').clone();
            //--  :)
	   if(strMessage.search(/^!drop|^!box/i)>-1){
                console.log(strPersonaName,steamID,strMessage);
                //this.MuteUserForSession(elMessage.data( 'steamid' ),strPersonaName);
                return 0;
            }
            //--
            elMessage.attr( 'id', '' );
            elMessage.attr( 'data-steamid', steamID );

            var elChatName = $J( '.tmplChatName', elMessage );
            elChatName.text(strPersonaName);
            elChatName.attr( 'href', 'https://steamcommunity.com/profiles/' + steamID );
            elChatName.attr( 'data-miniprofile', 's' + steamID );

            if ( steamID == this.m_broadcastSteamID )
                elMessage.addClass( 'Broadcaster' );

            var elText = $J( '.tmplChatMessage', elMessage ).text(strMessage);

            var strHTML = elText.html();
            strHTML = this.AddEmoticons(strHTML, steamID, bLocal);
            strHTML = this.AddLinks(strHTML);

            elText.html(strHTML);

            elMessage.show();

            var bAutoScroll = this.BAutoScroll();
            $J('#ChatMessages').append(elMessage);

            // if text is too long, add expand button
            var elText = $J( '.tmplChatMessage', elMessage );
            if ( elText.height() > elMessage[0].clientHeight )
            {
                var elExpand = $J( '<div class="ChatExpand">+</div>' );
                elMessage.append(elExpand);
                elExpand.on('click', function () { _chat.ExpandMessage(elMessage) } );
            }

            if (bAutoScroll)
                this.ScrollToBottom();
        };
    }
})();

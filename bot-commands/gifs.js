function gifs(bot, msg) {
  if (msg.text === "!gifs") {
    bot.sendMessage(
      msg.chat.id,
      `Gifs list
    
!84years
!badluck
!boringwork
!bullshit
!butdidyoudie
!byemylover
!clap
!disgusting
!doit
!drop
!fakenews
!faith
!french
!goodbyetoby
!ibelieveicanfly
!imthirty
!jlaugh
!kevinlaugh
!manco
!mf
!michaellaugh
!miedo
!money
!moneybitch
!nah
!nailedit
!nogod
!noloserick
!notamused
!ohno
!pizza
!roasted
!runaway
!sattosad
!sattohappy
!science
!shutup
!skeleton
!slap
!sleep
!slut
!smug
!suckit
!staycalm
!tasteit
!thankyou
!thatswhatshesaid
!thisistheworst
!tudemun
`
    )
  }

  const gifs = {
    "!84years": "https://c.tenor.com/ijmuObw1aq4AAAAC/tenor.gif",
    "!badluck": "https://c.tenor.com/SoWC9LwqnOsAAAAC/tenor.gif",
    "!boringwork": "https://c.tenor.com/W_D7lBlzpPkAAAAd/tenor.gif",
    "!bullshit": "https://c.tenor.com/jVb4zcaK2YMAAAAC/tenor.gif",
    "!butdidyoudie":
      "https://y.yarn.co/e5b09f7a-6538-444a-9bd9-32a4e34b2f12_text.gif",
    "!byemylover": "https://i.giphy.com/AFhlgdxqzAtFMIgpBA.mp4",
    "!clap":
      "https://i.pinimg.com/originals/bc/9e/75/bc9e7575b43676b86d04e8fd8b4fc607.gif",
    "!disgusting":
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdjc3a3NhaDdsYWdwYXJ3NW5kNHZqendrOTkwZHJvdmtsM3RudDBvdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QiMIBUa0Gzxa8/giphy.gif",
    "!doit": "https://c.tenor.com/I6ggVKuaWoMAAAAC/tenor.gif",
    "!drop":
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHc0Zm53cW1seGhqNWpqYnpqcDB1cmNkb21wMXMya2x1aDV5Y3J0MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3LcOi1fXmCzNaYyemC/giphy.gif",
    "!fakenews": "https://j.gifs.com/mwkq9r.gif",
    "!faith":
      "https://64.media.tumblr.com/aea8fb513d5754a88b10f50aee0295bc/tumblr_plq9ytHmfw1xl8z7mo3_540.gif",
    "!french": "https://c.tenor.com/XC0E1SBI3xUAAAAd/tenor.gif",
    "!goodbyetoby":
      "https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzM3emp3MXQ5YXNhNzVtdGJsb3Jxdjhtdjl0Yzl4aDhjYjRrOGIwZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/SJkrl8WemSdZDRrT2T/giphy.gif",
    "!ibelieveicanfly": "https://i.gifer.com/1cIP.mp4",
    "!imthirty":
      "https://gifdb.com/images/high/the-office-creed-i-m-thirty-z8tfjqha0m9e1ofh.gif",
    "!jlaugh": "https://c.tenor.com/wIxFiobxxbIAAAAd/tenor.gif",
    "!kevinlaugh": "https://i.imgur.com/Rx7jxPl.gif",
    "!manco": "https://media.tenor.com/9X1Jz6p60wwAAAAM/checo-checo-perez.gif",
    "!mf": "https://c.tenor.com/rLVX7j6oeGsAAAAC/tenor.gif",
    "!michaellaugh": "https://c.tenor.com/9v8LTDyxiWgAAAAC/tenor.gif",
    "!miedo":
      "https://cdn.streamelements.com/uploads/ed911ead-3507-4542-b1aa-b834df4361cc.gif",
    "!money": "https://i.makeagif.com/media/2-17-2016/7ZoOxX.mp4",
    "!moneyb":
      "https://y.yarn.co/d4c21af8-82cb-45a6-8cb3-ad41461c547a_text.gif",
    "!nah":
      "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExd28ybDZ4Zmk3c3Nsb2s5bHVqaDI5YzUzYWZ1OGhhcDQwdjNmMGRjYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XSbDe4Ok8NshxIhCpf/giphy.gif",
    "!nailedit": "https://c.tenor.com/tWdqNWk5XMwAAAAC/tenor.gif",
    "!nogod":
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExdGt3Mm45eDAwbWNpdjNjMWN0NGxmeTZlenoyODVhOXdkbWFxN2FjciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/JFau5y7m9pkEU/giphy.gif",
    "!noloserick": "https://c.tenor.com/ysDw3WNr4ygAAAAC/tenor.gif",
    "!notamused": "https://c.tenor.com/Wk4XvHt06b4AAAAC/tenor.gif",
    "!ohno": "https://c.tenor.com/RL0-tTg3QOQAAAAC/tenor.gif",
    "!pizza": "https://c.tenor.com/TGUlP0OA85AAAAAC/tenor.gif",
    "!roasted": "https://c.tenor.com/i5WfwXr8rg0AAAAC/tenor.gif",
    "!runaway": "https://c.tenor.com/_i2dUyBrQM8AAAAC/tenor.gif",
    "!sattosad": "https://media.tenor.com/eujDdERu43YAAAAM/satto-bitcoin.gif",
    "!sattohappy": "https://c.tenor.com/o8aFi5PiHpIAAAAd/tenor.gif",
    "!science":
      "https://media.tenor.com/CughyuQS8XIAAAAC/breakingbad-science.gif",
    "!shutup":
      "https://i0.wp.com/media4.giphy.com/media/10RCqM2nZpdqOQ/giphy.gif",
    "!skeleton":
      "https://gifdb.com/images/high/skeleton-sitting-waiting-4t258rv035kqw3su.gif",
    "!slap":
      "https://i.pinimg.com/originals/18/77/34/1877343bd0acb751f5e6d536df5261c9.gif",
    "!sleep": "https://c.tenor.com/BU4SOdhD9vgAAAAC/tenor.gif",
    "!slut": "https://y.yarn.co/0f647830-afb9-4535-81e6-81250374ef0c_text.gif",
    "!smug": "https://i.imgur.com/p2UFUY5.gif",
    "!suit": "https://i.makeagif.com/media/8-22-2017/62GFrD.mp4",
    "!staycalm": "https://c.tenor.com/qdSYlo7rbXwAAAAC/tenor.gif",
    "!tasteit":
      "https://y.yarn.co/4ff90084-ffd0-4852-9e66-14bbf39bb736_text.gif",
    "!thankyou": "https://c.tenor.com/pyGugHcm4XcAAAAC/tenor.gif",
    "!thatswhatshesaid": "https://i.gifer.com/ePJ.mp4",
    "!thisistheworst":
      "ifs.us/wp-content/uploads/2016/04/the_worst_the_office.gif",
    "!tudemun":
      "https://global.discourse-cdn.com/woot/original/4X/7/4/8/748ce093d0ca9892f522ae96572f7d2e6f9192dd.gif",
  }

  let gif = gifs[msg.text]
  if (gif) {
    bot.deleteMessage(msg.chat.id, msg.message_id)
    bot.sendAnimation(msg.chat.id, gif)
  }
  console.log(msg.from.id, msg.chat.id, msg.chat.first_name + ":" + msg.text)
}

export default gifs

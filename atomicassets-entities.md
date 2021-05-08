AtomicAssets contract

https://github.com/pinknetworkx/atomicassets-contract/wiki/Structure
Structure
ב- AtomicAssets יש Collections, Schemas, Templates and Assets הממלאים תפקידים שונים ולפעמים קשורים זה לזה 

Collections – Pokemon GO
Collections מאחדים assets ו-templates ביחד.
כדי ליצור schemes ואז templates ו-assets, צריך ליצור collection ולהוסיף חשבונות לרשימת ה- authorized_accounts כאשר הם בלבד יכולו ליצור assets או templates עבור אותו ה- collection.
משתמשי הקצה אמורים להבחין לאיזה collection asset מסויים שייך.

Scheme – Pokemon / Pokeballs / Berries
סכמות מגדירות סוגי assets.
מגדירים מבני data. בעלי שם ייחודי ווקטור של FORMATים = אוסף של זוגות שם וtype, המתארים תכונות של מבנה ה-data.
סכמות משוייכות לcollectionים. ויוצר הcollection יכול להרחיב בהמשך גם את הסכמה ע"י הוספת FORMATים. אי אפשר למחוק FORMATים.

Template - all Pikachus
סוג זהה של assets.
משתייך לסכמה 

Assets - my Pikachu that is level 23 and learned Thunderbolt
נכס בסיסי ששייך למישהו



import telegramImg from "./imgs/telegram.svg";
import gitImg from "./imgs/git.svg"
import "./Contacts.scss";
import FormInput from "../../atoms/formInput/formInput";

export default function Contacts() {
    return(
        <div className="Contacts">
            <h2 className="Contacts__title">Контакты</h2>
            <div className="Contacts__main">
                <div className="Contacts__text">
                    <h3>Еще раз здравствуйте! Я рад, что вы продолжили сёрфить по моему сайту, и перешли на эту страницу.
                        Я бы хотел вам кратко рассказать зачем же нужен этот сайт. Однажды мне сказали, что я никогда не смогу сделать интернет-магазин с полным его функционалом, после этого я бросил себе вызов сделать его.
                        В этом интернет магазине использованы следующие технологии:
                        Frontend: React(react-hooks), mobx, typescrypt, dotenv
                        Backend: NodeJS, bcrypt, express,cors,express-fileupload, jsonwebtoken, sequelize, postgreSQL, pgAdmin, cors, dotenv
                        Design: Figma</h3>
                    <h3 className="text__alert">
                        Позвольте напомнить вам еще раз, этот сайт не продает товары или услуги, он служит исключительно в качестве примера моей работы.
                    </h3>
                    <div className="contactMe">
                        <h2 className="contactMe__title">Связаться со мной</h2>
                        <h3 className="contactMe__mail">Mail: bulat.gimaletdinov.01@gmail.com</h3>
                        <div className="contactMe__telegram">
                            <h3 className="contactMe__text">telegram: @BulatGim</h3>
                            <img src={telegramImg} alt=""/>
                        </div>
                        <div className="contactMe__git">
                            <h3 className="contactMe__text">git: <a href="https://github.com/BulatGim">BulatGim</a></h3>
                            <img src={gitImg} alt=""/>
                        </div>
                    </div>
                </div>
                <div className="askQuestion">
                    <h3 className="askQuestion__title">Задать вопрос</h3>
                    <form action="">
                        <div className="askQuestion__aboutUser">
                            <FormInput placeholder="Имя" width={12}/>
                            <FormInput placeholder="Email" width={22}/>
                        </div>
                        <FormInput placeholder="Текст сообщения" width={35} height={10}/>
                        <button className="askQuestion__send" type="submit" ><h3>Отправить</h3></button>
                    </form>

                </div>
            </div>
        </div>
    )
}
import {FC} from "react";



interface ITexBlock {
    name: String;
    surname?: String;
}

const TsXblock: FC<ITexBlock> = ({name, surname}) => {
    return (
        <>
            <div>
                Hi this is tsx block
            </div>
            <div>
                {name}
                {surname}
            </div>
        </>
    );
};

export default TsXblock;
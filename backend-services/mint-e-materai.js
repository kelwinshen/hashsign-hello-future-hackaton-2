
//if want to run this code, dont forget to add this in the package.json file "type": "module",
import {
    TokenCreateTransaction,
    TokenMintTransaction,
    TokenType,
    TokenSupplyType,
    PrivateKey,
    Client,
    AccountId,
    Hbar,
} from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

async function main() {
    const operatorId = AccountId.fromString(process.env.MY_ACCOUNT_ID);
    const operatorKey = PrivateKey.fromStringECDSA(process.env.MY_PRIVATE_KEY);

    if (!operatorId || !operatorKey) {
        throw new Error(
            "Environment variables MY_ACCOUNT_ID and MY_PRIVATE_KEY must be set."
        );
    }

    const client = Client.forTestnet().setOperator(operatorId, operatorKey);

    // IPFS Metadata CIDs
    const metadataArray = [
        // "bafkreihkw77mii267hxfdjvuikhascomfegzteisynxqimgfjh77mv7znm",
        // "bafkreiammjjz54ccs6czfo4wp6qbitgnzqfyca6b3hgryobj2ne7cohiue",
        // "bafkreigepjlxkj2eiaeabzegyru2miyzepokmqxopd4eqfeklsvruw3bzq",
        // "bafkreibw4l6ndtv22iofwbr2odemejox7chcajtnlxhmfyp3urlhra5ugi",
        // "bafkreigvh5wicksnf3pctsyrztneg7rmz64ifxeg3lz47ibdgitadgnusy",
        // "bafkreigivclwsjpz4uny2p7dg2dan3o652tadlbqx37iegjrspakq7skxq",
        // "bafkreievji3ncoutc3fm42rmlo2e2mz2i7fk7snmcartwwshwcpr6h67qu",
        // "bafkreid3lm4xbqqrfxcwln6q3exsb5frrhq6yqiebygobooln4xkoydpoy",
        // "bafkreignf6nldjf4x5qjoaxrp4wkxfd7iizq2ddrspcgikzfsc4fo6fkmq",
        // "bafkreibp6no7t5dsb7xgtoyajus4agrnpmev4h56uyi7ttzhluxakgz73m",
        // "bafkreifedc25cba73uwsd65bmrnp3iwdydp2ej7vl7e3hcsqcxorqewwz4",
        // "bafkreigbrcxh532zprqo4xwjyc4aabm32hmmamjuw2nkdy2jkq4doquvse",
        // "bafkreiftkpl7gz6bh62p3lhxoeeljudv3bp4w7xcqrti3yqtyeripwo6ju",
        // "bafkreih53g5yy5hxigztdooqrwdrve7z5qb5vx5xwjnygaevgg2mqfweba",
        // "bafkreibpqwy7ge4z5jiz427snqtqznvlypdgoods75kapdsy3u7hruves4",
        // "bafkreieua3bed4abavpw5qzsaldti6gvx7ymtdzenzrq4nhvokdpppzmm4",
        // "bafkreih3ycvvt6v75ui4wcnhasr7ygooxow7tfrzuhlrygqdslcedi57b4",
        // "bafkreihzgl4o7szz5vfp6ioyvynjq5f3x4arwglwpwjj5rda33uwt6i77i",
        // "bafkreidk7hq6wxhhxhrayaxz2q77wgvguiepfgbrgufwaxcfnneu3ucf4i",
        // "bafkreihwbvebeuyn43khsnuvu3sdwmnzzplymxlikwuietfrym6grm7uxy",
        // "bafkreififqg4i7h37r3g5mu646ymt52dpzdb2kf4fekswfen5wtnoardsa",
        // "bafkreicakwcp5u2zwz4tahsiqtk2gqsbfpy2tyyamfkji6w7wmu47oo4mm",
        // "bafkreie3wgnahjpdb5fnqqeqrf3beizt7hztag54lkzyrsaxbqckynu5by",
        // "bafkreibmzxbcjusrymmwnevsjmzng26ofgpqerzajvcqfaxap2umxgmrdy",
        // "bafkreih7v32xjgzzn4lipqy4rvybudonb2h5kbj5c72xe4fuatwgqhgb4e",
        // "bafkreidusepkqkwyiji4o6tnqepgw4n6y3lne4fvs43yso23ur3f3vvlya",
        // "bafkreibwp6dva4eit4nsibdfs7c5dl4j6x32rvpxxuvdbznebxbibsivdi",
        // "bafkreiflki4fvblbely7plrulstdkpwynakvtyboyyipaak5ijgkpdauya",
        // "bafkreicvhan7bcqoqtv3mwmwles7jrvzc4gn2xsu5zxoox6qsfsgns2ozq",
        // "bafkreicl32kg7d725gsinkjwchjj2rsrv7m7urfoaqj5ec5633xqara2de",
        // "bafkreic6fvcrajar3zth2l5dyfxs5cnru74h5ov2jtl2xsij7c5quzm2ee",
        // "bafkreihpbvqde5ay3zv5yczmtxfhpr7lelxy2hsn7i3s2lwabs4vbenbty",
        // "bafkreigwbsml3diz6rvfceckb3s5xbwpcsidfttbrjxqgzcibhpagne4se",
        // "bafkreif4svzmt2bfmynsgyuac5sjtaafpyo2fvybkopuo2aqdm4bltj6ri",
        // "bafkreidgk3xqq2jkp2l27e7au3itp73ynselwgyxhhigqvd7ombdbk4c34",
        // "bafkreiazjgvhazzmwt5pxml7fvmkilxvv7ebjfqjarfx43bikkt3wdpa6i",
        // "bafkreihot72jqvih56yc7ntesttt6cmobuswg5tt6d7hws7xva673si37e",
        // "bafkreibwvo4vhq23fmv5boi7psqo3m23qx7ggpxcal3f4jfovy4ywi7eqa",
        // "bafkreiaaw3fi2pjrglyvo3rjypd2cy3ogi66blqcfzr65wooecs4nz3wcu",
        // "bafkreifmgoh7wvt76mbaxvdkekwpvj2szgqrw5tiqjrhmwzkl73sgpmomq",
        // "bafkreiexb6g7d7shmvmd2x3savqdhbecksfeclm5u6bwakifqyw7t7zeay",
        // "bafkreibyweuc4xewv4hihlneb3lqmxf5vam45mxvrkii3qda2pavkfonoq",
        // "bafkreibjpde5c5nwn6fcq5z37e5pxmezrs2fv6zxw2kdcu354hldmeemyi",
        // "bafkreif7pft6rq2pikch6rvi3t5gv3tfmsmh2asgrk65ch4wydd4rms2oq",
        // "bafkreihjfidtqft55ahitj4vh5kejnygt4tap5ndxaxu6bw2k33etu4uye",
        // "bafkreidrxke4gbgk4twfga6bo4octx35z3gtjdxe4nnh4xu6t5v4i6rxu4",
        // "bafkreifizonxp3xmkafasr4ksxz5ebec6l2idtejvbu6o3uvkl73jo7pt4",
        // "bafkreifbaswqi4tyoqias3a7l4pkzdfhfotfr6rqbtqujjnsmjt7k2oh3q",
        // "bafkreidnxykwmp65r2o3ed3apz6j4srkyapsyqx3smapiw5l6ezfuv5kv4",
        // "bafkreiackrf2cxgnvfnujlfeuy7cy467wrtyss4wp4xdkyb4jvycg4c3mq",
        // "bafkreicb2xsqkeygqcaqi2xids5ccz77vb623ktafoubuxzj5fijnzrnlq",
        // "bafkreibbput4phbky6phkt22x7562rpf5c46iw6erjehw7coxydv4xvo6m",
        // "bafkreib32zbn2mesu57f65omnngisteztxqikybpsinhjkhrozfhznlx2q",
        // "bafkreibmn3xjug3ftjf7chmdlfjorsv3ryov2w7wayjc5qfjtvd3enjgcm",
        // "bafkreiflg4d2d3fozuj7aqp2cufs6ig7bn6gt6ok6kzedfpxverd67ao5a",
        // "bafkreibhxum4nf3qk3yeqmhegekuinbyydtd37hr7ayzwu2q7tygviz6qi",
        // "bafkreibvpeqthqluqsn7jffapw7tgc3x4dhlmihnjlf2qrpr7guuly4aii",
        // "bafkreif2vi3xt34ufpyjhnn3c6auw24xjgmj547ogq43cb4imto4nsvofa",
        // "bafkreihabzn6gsy447ic446sxkdqte6af2farqnmhxh6r5m2fpjzzlt5ym",
        // "bafkreiauuel3h3fndfyk4eox3jwygcl2yifstabuml77q5lpjxpvdpuev4",
        // "bafkreidu2s7m3erd56irknwf7yquxm6yd24ex54xjzohpdvivezdeuciwa",
        // "bafkreiaufjixrc55gwidbaott2rg5smjqdrzjiprh4iotfjpiqcfdn3fli",
        // "bafkreibmhlb5btrwh2ngzjwjui2g5djs5apfa43oeskyfaudfbbjlzfyia",
        // "bafkreihxlr6ptvvmt437766y6tqci6dcqcr3vjjeu2f4h5y7aymlyh3vay",
        // "bafkreibbfniwcdyhs2tyg77zpitftdp3ywzstxabekfn5av6guclonfjca",
        // "bafkreibsyauhw35taa2yegazwygsqmwdifrgmp5jovstht2nkq7k2uaiyy",
        // "bafkreigqjx6h2sdx4lvxirlou2siw3ysrvwhdanhewrchxoyvxmdkaelqi",
        // "bafkreigxz6svn6mcnplwu5axj7l7yfduzavxjgkgnjhwdhazelyi32mj2e",
        // "bafkreifowf5soxs2edgo5wkualxtny7v2c2taw37ggkhzw4rt6rvnwzaxu",
        // "bafkreiersoeam6arszpmgtaiyhmmcz7zj3cxcdn5zw26b3nt4unm26vpna",
        // "bafkreibkp2qchl2vzh7c27h6q3wg5mxopynehhxnieysizti6ejwpczrcu",
        // "bafkreievpsqjlb2vmsdu2b6lqg4uwwetryzq43gr4quiakabh444thyqd4",
        // "bafkreiamjcgr3d4szq7f4ff5uw4akqynhvm5n24jvdxowfiskbe4dnomei",
        // "bafkreiclncnkygjopynpiltrxprbamthgn4wvabq4rojnldjocczou4asy",
        // "bafkreibox6oat7u3sl2wvk3xanenlgaqlgq2fljr26ssy5ofvxuclfjuse",
        // "bafkreif75tx2ixppelqm6nlztom245oftngo6u3teyq4t7izlrfs3i24ye",
        // "bafkreifs2dihdofwaokfrvve4wi5jw2hwxp7k5lewtw2uin2numrnz42fu",
        // "bafkreihrje75idlctdoryqomx3mhwn5kee5wjij3euujik2uovcmtlcb5a",
        // "bafkreiaizmvvksbeozsqrngpt5x74jfdjjstqpc2xmj32dcgnutgevx3zu",
        // "bafkreidppd22gbdam46axjfsyaethc3ucacqmybfozak37npksjwf5fr7y",
        // "bafkreignxc3jdlrfrnwyc4qxct5jyissbfkp7vftmoxxekg6yxyfixwatq",
        // "bafkreifgpwmdx2m2w5z65tl6riixpkmqnmbnltzsrlq5csabsklf73mrta",
        // "bafkreiffpvynwv5vxm3my7xj2e5hheo73gmjk4kbzjh6vs6dod7nux4s6q",
        // "bafkreifnjesqg2dklihrgy3on26dmq4m5izttlx7seemudmq2ljwhbpaui",
        // "bafkreic4qdqr7qbvwf4hhhhxmqto5hf3zfrxg4zf37izpub6stbpukelsy",
        // "bafkreiedglrbomz5ofq53c57saelpx4vxkqmpqjguc7ieefoiharfk6cwi",
        // "bafkreif5kyebt4uko5vzgweffi7cxatncxobrkcxgsaizojcozy4quuify",
        // "bafkreihgwunowmym6umtv6qxmgbjjlhgiraisboh6ekh7fqreii4ddvteu",
        // "bafkreihysigpcpds3xeq7f7nfl5lmjmr6dzly6ii3vrsduoikkn7kkbcgy",
        // "bafkreidvxniygc4sqhawbd74qw7xtsl5cfdxcjbdwkzcldfixajcvf7smy",
        "bafkreicov63ljntvbtwsnxpma6hzowjaxat474nyp3x5dzhbdfkv7c22ha",
        "bafkreihj43l5l2xowbejo75kn4yhbeqs4kmsalpj26uhpv7obz53s75zxm",
        "bafkreibweoj7mmrnd42w3w2up7tayptbupqe7jycrjpq66sjjlwg62onjy",
        "bafkreice2vquzyvvwednkwpyv5pbvhbyxheelcet754h7adhktsfp3dmnm",
        "bafkreidrzzzbyl3mmxlla7f7xesauah2iiy3klhwimmcj3qfydlqcwfc3a",
        "bafkreidfbz5qx6oqmd6ymrp2mnfkkekcg7d6h4h54xbsowdhsd4brgdk3a",
        "bafkreic37sodujtdmigsvcghawfr6jbsrm5pqunkjnwxvwsfdth2gvkosa",
        "bafkreigf3anqfgrane3njukotdzhuyss7zdirimdmzoodjsoaiymleboiu",
        "bafkreibdamkjhcrgxf23srbb7p2yp5e6zheipoohsym4iawl4ti5of23ry",
        "bafkreigevgc4lqnpeutjuqob3y3fbmw5lfitxlv2k35kguov2v3bhkgwrq",


    ].map((cid) => new TextEncoder().encode(`ipfs://${cid}`));

    try {
        console.log("=== Creating e-Materai NFT Token ===");

        // Create NFT Token
        const nftCreateTx = new TokenCreateTransaction()
            .setTokenName("e-Materai")
            .setTokenSymbol("MAT")
            .setTokenType(TokenType.NonFungibleUnique)
            .setDecimals(0)
            .setInitialSupply(0)
            .setSupplyType(TokenSupplyType.Infinite)
            .setTreasuryAccountId(operatorId)
            .setSupplyKey(operatorKey)
            .setAdminKey(operatorKey)
            .freezeWith(client);

        const nftCreateTxSigned = await nftCreateTx.sign(operatorKey);
        const nftCreateTxResponse = await nftCreateTxSigned.execute(client);
        const nftCreateTxReceipt = await nftCreateTxResponse.getReceipt(client);

        const tokenId = nftCreateTxReceipt.tokenId;
        console.log(`NFT Token Created: ${tokenId.toString()}`);
        // const tokenId = "0.0.5266374"
        // Mint NFTs
        console.log("\n=== Minting e-Materai NFTs ===");
        const nftMintTx = new TokenMintTransaction()
            .setTokenId(tokenId)
            .setMetadata(metadataArray)
            .setMaxTransactionFee(new Hbar(20)) // Set sufficient fee
            .freezeWith(client);

        const nftMintTxSigned = await nftMintTx.sign(operatorKey);
        const nftMintTxResponse = await nftMintTxSigned.execute(client);
        const nftMintTxReceipt = await nftMintTxResponse.getReceipt(client);
        console.log("Minted NFT Serial Numbers:", nftMintTxReceipt.serials);

        console.log(`NFT Minting Status: ${nftMintTxReceipt.status.toString()}`);
        console.log(`Minted NFTs with Token ID: ${tokenId.toString()}`);
        console.log("\n=== NFT Creation and Minting Complete ===");
    } catch (error) {
        console.error("Error during NFT creation or minting:", error);
    } finally {
        client.close();
    }
}

main();
